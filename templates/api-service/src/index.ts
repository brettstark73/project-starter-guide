import app from "./app";
import { env } from "./config/env";

// Validation happens on import - fails fast if env vars are invalid

// Only start server when this file is run directly (not imported by tests)
if (require.main === module) {
  app.listen(env.PORT, () => {
    console.log(`🚀 Server running on port ${env.PORT}`);
    console.log(`📝 Environment: ${env.NODE_ENV}`);
  });
}

export default app;
