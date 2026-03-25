import rateLimit from 'express-rate-limit'

/**
 * Rate limiter for login endpoint to prevent brute-force attacks.
 * 
 * Configuration:
 * - Window: 60 seconds (1 minute)
 * - Max requests: 5 per window per IP address
 * - Store: In-memory (default MemoryStore)
 * - Headers: RateLimit-* (RFC draft standard)
 * 
 * Behavior:
 * - After 5 requests in 60s window: Return 429 Too Many Requests
 * - Counter resets after windowMs expires
 * - Each IP address has independent counter
 * 
 * Security Note:
 * - Counts ALL login POST requests (success or failure)
 * - To only count failed attempts, use skipSuccessfulRequests: true
 *   (requires custom logic to mark success/failure)
 * 
 * Related: GAP-014 (No rate limiting on login endpoint)
 */
export const loginRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // Limit each IP to 5 requests per windowMs
  message: 'Too many login attempts from this IP, please try again after a minute.',
  standardHeaders: true, // Return rate limit info in RateLimit-* headers
  legacyHeaders: false, // Disable X-RateLimit-* headers (use standard draft-6 headers)
  
  // Store: default is MemoryStore (sufficient for single-instance deployment)
  // For multi-instance production, use rate-limit-redis:
  // store: new RedisStore({ client: redis })
  
  // Skip successful requests? (only count failures)
  // skipSuccessfulRequests: false, // Count all requests for now
  
  // Custom handler for 429 response (optional, uses default message above)
  // handler: (req, res) => {
  //   res.status(429).json({
  //     error: 'Too many login attempts',
  //     retryAfter: req.rateLimit.resetTime
  //   })
  // }
})

export const passwordChangeRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5,
  message: 'Too many password change attempts from this IP, please try again after a minute.',
  standardHeaders: true,
  legacyHeaders: false,
})

export const adminPasswordResetRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10,
  message: 'Too many password reset attempts from this IP, please try again after a minute.',
  standardHeaders: true,
  legacyHeaders: false,
})
