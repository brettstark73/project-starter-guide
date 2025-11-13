import NextAuth from 'next-auth'
import { NextAuthOptions } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import EmailProvider from 'next-auth/providers/email'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'

import { prisma } from '@/lib/prisma'

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

  // In production, this is critical - throw error
  if (process.env.NODE_ENV === 'production') {
    throw new Error(
      'No authentication providers configured. Set environment variables for at least one provider.'
    )
  }

  // In development, add fallback mock provider
  providers.push(
    CredentialsProvider({
      name: 'Mock Auth',
      credentials: {
        email: { label: "Email", type: "email" },
      },
      async authorize(credentials) {
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

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers,
  callbacks: {
    async session({ session, token, user }) {
      // Send properties to the client
      if (session.user) {
        session.user.id = user.id
      }
      return session
    },
    async jwt({ token, user, account }) {
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
    strategy: 'database',
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
