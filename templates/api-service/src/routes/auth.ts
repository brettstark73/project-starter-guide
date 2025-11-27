import { Router } from 'express'
import { register, login, getProfile } from '../controllers/authController'
import { authenticateToken } from '../middleware/auth'
import { authLimiter, registrationLimiter } from '../middleware/rateLimiting'

const router = Router()

// Registration with stricter rate limiting (3 per hour)
router.post('/register', registrationLimiter, register)

// Login with auth rate limiting (5 per 15 minutes, skips successful requests)
router.post('/login', authLimiter, login)

// Profile (authenticated)
router.get('/profile', authenticateToken, getProfile)

export default router
