import express from "express";
import { authenticateToken } from "../middleware/auth";
import type { AuthenticatedRequest } from "../types/express";

const router = express.Router();

// GET /api/users/profile - Get user profile (protected route example)
router.get(
  "/profile",
  authenticateToken,
  async (req: AuthenticatedRequest, res) => {
    try {
      res.json({
        message: "This endpoint requires authentication",
        user: { id: req.userId },
      });
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  },
);

export default router;
