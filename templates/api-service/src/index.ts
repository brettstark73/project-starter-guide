import app from './app'

const PORT = process.env.PORT || 3000

// Only start server when this file is run directly (not imported by tests)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`)
    console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`)
  })
}

export default app