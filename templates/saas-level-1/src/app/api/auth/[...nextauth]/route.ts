import NextAuth from 'next-auth'
import { NextAuthOptions } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'

// Lazy-load Prisma only when needed (OAuth providers)
// This prevents DATABASE_URL errors when using mock/credentials providers
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let prisma: any = null
const getPrisma = () => {
  if (!prisma) {
    const { prisma: prismaInstance } = require('@/lib/prisma')
    prisma = prismaInstance
  }
  return prisma
}

const providers: NextAuthOptions['providers'] = []

// Development-only provider for easy local testing
if (process.env.NODE_ENV === 'development') {
  providers.push(
    CredentialsProvider({
      name: 'Development',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "dev@example.com" },
      },
      async authorize(credentials) {
        // WARNING: This is for DEVELOPMENT ONLY
        // Returns a mock user for any email
        if (credentials?.email) {
          return {
            id: 'dev-user-1',
            email: credentials.email,
            name: 'Dev User',
          }
        }
        return null
      },
    })
  )
  console.log('[auth] Development credentials provider enabled')
}

if (process.env.GITHUB_ID && process.env.GITHUB_SECRET) {
  providers.push(
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    })
  )
} else {
  console.warn(
    '[auth] GitHub provider disabled – GITHUB_ID and/or GITHUB_SECRET not set.'
  )
}

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  )
} else {
  console.warn(
    '[auth] Google provider disabled – GOOGLE_CLIENT_ID and/or GOOGLE_CLIENT_SECRET not set.'
  )
}

const hasEmailConfig =
  process.env.EMAIL_SERVER_HOST &&
  process.env.EMAIL_SERVER_PORT &&
  process.env.EMAIL_SERVER_USER &&
  process.env.EMAIL_SERVER_PASSWORD &&
  process.env.EMAIL_FROM

if (hasEmailConfig) {
  // Lazy-load EmailProvider to avoid requiring nodemailer when not needed
  const EmailProvider = require('next-auth/providers/email').default
  providers.push(
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    })
  )
} else {
  console.warn(
    '[auth] Email provider disabled – EMAIL_SERVER_* variables not fully configured.'
  )
}

if (providers.length === 0) {
  console.error('[auth] No authentication providers configured!')
  console.error('[auth] For development: app will use mock provider automatically')
  console.error('[auth] For production: set environment variables for at least one provider')
  console.error('[auth] Available providers: GitHub, Google, Email')

  // In development, add fallback mock provider
  providers.push(
    CredentialsProvider({
      name: 'Mock Auth',
      credentials: {
        email: { label: "Email", type: "email" },
      },
      async authorize(credentials) {
        // In production, refuse to authenticate
        if (process.env.NODE_ENV === 'production') {
          throw new Error(
            'Mock authentication is not available in production. Configure real auth providers.'
          )
        }

        return {
          id: 'mock-user',
          email: credentials?.email || 'mock@example.com',
          name: 'Mock User (configure real auth providers)',
        }
      },
    })
  )
  console.warn('[auth] Using fallback mock provider - configure real providers for production!')
}

// Determine if we're using credentials providers (dev/mock)
const hasCredentialsProvider = providers.some(p => p.id === 'credentials')

const authOptions: NextAuthOptions = {
  // Only use Prisma adapter for OAuth providers (not credentials)
  adapter: hasCredentialsProvider ? undefined : PrismaAdapter(getPrisma()),
  providers,
  callbacks: {
    async session({ session, token, user }) {
      // Send properties to the client
      if (session.user) {
        // For JWT strategy, user comes from token
        // For database strategy, user comes from database
        session.user.id = user?.id || token?.sub || ''
      }
      return session
    },
    async jwt({ token, user, account }) {
      // For credentials provider, store user info in token
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
      }
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
  },
  pages: {
    signIn: '/auth/signin',
    // signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  session: {
    // Use JWT strategy for credentials providers (dev/mock) to avoid DB FK errors
    // Use database strategy for OAuth providers (GitHub, Google, Email)
    strategy: hasCredentialsProvider ? 'jwt' : 'database',
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
