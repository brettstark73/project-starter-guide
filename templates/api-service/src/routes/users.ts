import express from 'express'
import { authenticateToken } from '../middleware/auth'

const router = express.Router()

// GET /api/users/profile - Get user profile (protected route example)
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    // This is handled by the auth controller's getProfile function
    // This route exists as an example of protected endpoints
    res.json({
      message: 'This endpoint requires authentication',
      user: { id: (req as any).userId }
    })
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

export default router