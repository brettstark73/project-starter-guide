import { Request, Response, NextFunction } from 'express'

export const errorHandler = (
  err: Error & { statusCode?: number; code?: number; errors?: Record<string, { message: string }> },
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  // Default error response
  let errorResponse = {
    message: err.message,
    statusCode: err.statusCode || 500
  }

  // Log error
  console.error(err)

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = 'Resource not found'
    errorResponse = { message, statusCode: 404 }
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered'
    errorResponse = { message, statusCode: 400 }
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors || {}).map((val) => val.message).join(', ')
    errorResponse = { message, statusCode: 400 }
  }

  res.status(errorResponse.statusCode || 500).json({
    success: false,
    error: errorResponse.message || 'Server Error'
  })
}