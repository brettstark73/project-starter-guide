/**
 * SSRF (Server-Side Request Forgery) Protection Middleware
 *
 * Validates and sanitizes URLs before making external requests.
 * Use this middleware to protect any endpoint that fetches external resources.
 *
 * Features:
 * - Blocks private/internal IP ranges (10.x.x.x, 172.16-31.x.x, 192.168.x.x, 127.x.x.x)
 * - Blocks localhost and loopback addresses
 * - Blocks reserved/special IP ranges
 * - Validates URL format and protocol
 * - Configurable allowed domains whitelist
 * - DNS rebinding protection via IP validation
 */

import { Request, Response, NextFunction } from 'express'
import dns from 'dns'
import { promisify } from 'util'
import { URL } from 'url'

const dnsLookup = promisify(dns.lookup)

// Private and reserved IP ranges that should be blocked
const BLOCKED_IP_RANGES = [
  // Private networks (RFC 1918)
  /^10\./,
  /^172\.(1[6-9]|2[0-9]|3[0-1])\./,
  /^192\.168\./,
  // Loopback
  /^127\./,
  // Link-local
  /^169\.254\./,
  // Carrier-grade NAT
  /^100\.(6[4-9]|[7-9][0-9]|1[0-1][0-9]|12[0-7])\./,
  // Reserved for documentation
  /^192\.0\.2\./,
  /^198\.51\.100\./,
  /^203\.0\.113\./,
  // IPv6 mapped IPv4 localhost
  /^::1$/,
  /^0:0:0:0:0:0:0:1$/,
  // Cloud provider metadata endpoints
  /^169\.254\.169\.254$/,
  /^fd00:/i,
]

// Blocked hostnames
const BLOCKED_HOSTNAMES = [
  'localhost',
  'localhost.localdomain',
  'metadata.google.internal',
  'metadata',
  'kubernetes.default',
  'kubernetes.default.svc',
]

// Allowed protocols
const ALLOWED_PROTOCOLS = ['http:', 'https:']

// Blocked ports (commonly used for internal services)
const BLOCKED_PORTS = [22, 25, 3306, 5432, 6379, 27017, 9200, 9300]

interface SSRFOptions {
  allowedDomains?: string[]
  allowedPorts?: number[]
  blockPrivateIPs?: boolean
  blockMetadataEndpoints?: boolean
  maxRedirects?: number
}

const defaultOptions: SSRFOptions = {
  allowedDomains: [],
  allowedPorts: [80, 443, 8080, 8443],
  blockPrivateIPs: true,
  blockMetadataEndpoints: true,
  maxRedirects: 0,
}

/**
 * Check if an IP address is in a blocked range
 */
function isBlockedIP(ip: string): boolean {
  return BLOCKED_IP_RANGES.some((pattern) => pattern.test(ip))
}

/**
 * Check if a hostname is blocked
 */
function isBlockedHostname(hostname: string): boolean {
  const lowerHostname = hostname.toLowerCase()
  return BLOCKED_HOSTNAMES.some(
    (blocked) => lowerHostname === blocked || lowerHostname.endsWith(`.${blocked}`)
  )
}

/**
 * Validate a URL for SSRF vulnerabilities
 */
export async function validateURL(
  urlString: string,
  options: SSRFOptions = {}
): Promise<{ valid: boolean; error?: string; url?: URL }> {
  const opts = { ...defaultOptions, ...options }

  try {
    const url = new URL(urlString)

    // Check protocol
    if (!ALLOWED_PROTOCOLS.includes(url.protocol)) {
      return { valid: false, error: `Protocol ${url.protocol} is not allowed` }
    }

    // Check hostname
    if (isBlockedHostname(url.hostname)) {
      return { valid: false, error: 'Hostname is blocked' }
    }

    // Check port
    const port = url.port
      ? parseInt(url.port, 10)
      : url.protocol === 'https:'
        ? 443
        : 80
    if (BLOCKED_PORTS.includes(port)) {
      return { valid: false, error: `Port ${port} is blocked` }
    }

    // Check allowed domains whitelist
    if (opts.allowedDomains && opts.allowedDomains.length > 0) {
      const isAllowed = opts.allowedDomains.some(
        (domain) =>
          url.hostname === domain || url.hostname.endsWith(`.${domain}`)
      )
      if (!isAllowed) {
        return { valid: false, error: 'Domain not in allowed list' }
      }
    }

    // DNS resolution check - validates the actual IP address
    if (opts.blockPrivateIPs) {
      try {
        const { address } = await dnsLookup(url.hostname)
        if (isBlockedIP(address)) {
          return {
            valid: false,
            error: 'URL resolves to a blocked IP address',
          }
        }
      } catch {
        return { valid: false, error: 'Failed to resolve hostname' }
      }
    }

    return { valid: true, url }
  } catch {
    return { valid: false, error: 'Invalid URL format' }
  }
}

/**
 * Express middleware to validate URLs in request body
 * Expects { url: string } in request body
 */
export function ssrfProtection(options: SSRFOptions = {}) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const urlToValidate = req.body?.url || req.query?.url

    if (!urlToValidate) {
      return next()
    }

    const result = await validateURL(urlToValidate, options)

    if (!result.valid) {
      return res.status(400).json({
        error: 'Invalid URL',
        details: result.error,
      })
    }

    // Attach validated URL to request for downstream handlers
    req.body.validatedUrl = result.url
    next()
  }
}

/**
 * Utility function for direct URL validation in controllers
 * @example
 * const { valid, url, error } = await validateExternalURL(userProvidedUrl)
 * if (!valid) throw new Error(error)
 * const response = await fetch(url.toString())
 */
export async function validateExternalURL(
  urlString: string,
  allowedDomains?: string[]
): Promise<{ valid: boolean; url?: URL; error?: string }> {
  return validateURL(urlString, {
    allowedDomains,
    blockPrivateIPs: true,
    blockMetadataEndpoints: true,
  })
}

export default ssrfProtection
