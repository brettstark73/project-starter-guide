/**
 * Structured Logging & Observability
 *
 * Production-ready logging with structured JSON output.
 * Includes request tracing, performance metrics, and error tracking.
 *
 * Usage:
 *   import { logger, requestLogger } from '@/lib/logger'
 *
 *   logger.info('User created', { userId: 123, email: 'user@example.com' })
 *   logger.error('Failed to process', { error, requestId })
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error'

interface LogContext {
  [key: string]: unknown
  requestId?: string
  userId?: string | number
  duration?: number
  error?: Error | unknown
}

interface LogEntry {
  timestamp: string
  level: LogLevel
  message: string
  context?: LogContext
  service: string
  environment: string
}

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
}

class Logger {
  private service: string
  private environment: string
  private minLevel: LogLevel

  constructor(
    service = 'api-service',
    minLevel: LogLevel = (process.env.LOG_LEVEL as LogLevel) || 'info'
  ) {
    this.service = service
    this.environment = process.env.NODE_ENV || 'development'
    this.minLevel = minLevel
  }

  private shouldLog(level: LogLevel): boolean {
    return LOG_LEVELS[level] >= LOG_LEVELS[this.minLevel]
  }

  private formatError(error: unknown): object {
    if (error instanceof Error) {
      return {
        name: error.name,
        message: error.message,
        stack: error.stack,
      }
    }
    return { raw: String(error) }
  }

  private log(level: LogLevel, message: string, context?: LogContext): void {
    if (!this.shouldLog(level)) return

    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      service: this.service,
      environment: this.environment,
    }

    if (context) {
      // Format errors specially
      if (context.error) {
        context = {
          ...context,
          error: this.formatError(context.error),
        }
      }
      entry.context = context
    }

    // Output JSON in production, pretty print in development
    const output =
      this.environment === 'production'
        ? JSON.stringify(entry)
        : JSON.stringify(entry, null, 2)

    // Use appropriate console method
    switch (level) {
      case 'debug':
        console.debug(output)
        break
      case 'info':
        console.info(output)
        break
      case 'warn':
        console.warn(output)
        break
      case 'error':
        console.error(output)
        break
    }
  }

  debug(message: string, context?: LogContext): void {
    this.log('debug', message, context)
  }

  info(message: string, context?: LogContext): void {
    this.log('info', message, context)
  }

  warn(message: string, context?: LogContext): void {
    this.log('warn', message, context)
  }

  error(message: string, context?: LogContext): void {
    this.log('error', message, context)
  }

  /**
   * Create a child logger with additional context
   */
  child(defaultContext: LogContext): Logger {
    const childLogger = new Logger(this.service, this.minLevel)
    const originalLog = childLogger.log.bind(childLogger)

    childLogger.log = (level: LogLevel, message: string, context?: LogContext) => {
      originalLog(level, message, { ...defaultContext, ...context })
    }

    return childLogger
  }
}

/**
 * Default logger instance
 */
export const logger = new Logger()

/**
 * Generate a unique request ID
 */
export function generateRequestId(): string {
  return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Express middleware for request logging
 */
import { Request, Response, NextFunction } from 'express'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      requestId?: string
      startTime?: number
    }
  }
}

export function requestLogger(req: Request, res: Response, next: NextFunction): void {
  // Generate and attach request ID
  req.requestId = req.headers['x-request-id'] as string || generateRequestId()
  req.startTime = Date.now()

  // Add request ID to response headers
  res.setHeader('X-Request-ID', req.requestId)

  // Log request start
  logger.info('Request started', {
    requestId: req.requestId,
    method: req.method,
    url: req.originalUrl,
    userAgent: req.headers['user-agent'],
    ip: req.ip,
  })

  // Log response when finished
  res.on('finish', () => {
    const duration = Date.now() - (req.startTime || Date.now())

    const logContext = {
      requestId: req.requestId,
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      duration,
    }

    if (res.statusCode >= 500) {
      logger.error('Request failed', logContext)
    } else if (res.statusCode >= 400) {
      logger.warn('Request client error', logContext)
    } else {
      logger.info('Request completed', logContext)
    }
  })

  next()
}

/**
 * Performance timing utility
 */
export function createTimer() {
  const start = process.hrtime.bigint()

  return {
    elapsed(): number {
      const end = process.hrtime.bigint()
      return Number(end - start) / 1_000_000 // Convert to milliseconds
    },
    log(message: string, context?: LogContext): void {
      logger.info(message, { ...context, duration: this.elapsed() })
    },
  }
}

/**
 * Metrics collection (simple in-memory for demo)
 */
interface MetricPoint {
  name: string
  value: number
  timestamp: Date
  tags?: Record<string, string>
}

class Metrics {
  private points: MetricPoint[] = []

  increment(name: string, value = 1, tags?: Record<string, string>): void {
    this.points.push({
      name,
      value,
      timestamp: new Date(),
      tags,
    })
  }

  timing(name: string, durationMs: number, tags?: Record<string, string>): void {
    this.points.push({
      name: `${name}.timing`,
      value: durationMs,
      timestamp: new Date(),
      tags,
    })
  }

  getMetrics(): MetricPoint[] {
    return [...this.points]
  }

  clear(): void {
    this.points = []
  }

  /**
   * Get summary statistics
   */
  getSummary(): Record<string, { count: number; total: number; avg: number }> {
    const summary: Record<string, { count: number; total: number; avg: number }> = {}

    for (const point of this.points) {
      if (!summary[point.name]) {
        summary[point.name] = { count: 0, total: 0, avg: 0 }
      }
      summary[point.name].count++
      summary[point.name].total += point.value
      summary[point.name].avg = summary[point.name].total / summary[point.name].count
    }

    return summary
  }
}

export const metrics = new Metrics()

export default logger
