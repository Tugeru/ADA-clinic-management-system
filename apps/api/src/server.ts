import app from './app.js'
import { env } from './config/env.js'
import { startSelfPinger } from './utils/self-pinger.js'

app.listen(env.PORT, () => {
  console.log(`[ADA API] Server running on http://localhost:${env.PORT}`)
  console.log(`[ADA API] Environment: ${env.NODE_ENV}`)

  const selfPinger = startSelfPinger({
    enabled: env.SELF_PING_ENABLED,
    baseUrl: env.SELF_PING_BASE_URL,
    fallbackBaseUrl: env.RENDER_EXTERNAL_URL,
    intervalMs: env.SELF_PING_INTERVAL_MS,
    timeoutMs: env.SELF_PING_TIMEOUT_MS,
  })

  if (selfPinger) {
    console.log(
      `[ADA API] Self-pinger active: ${selfPinger.endpoint} every ${env.SELF_PING_INTERVAL_MS}ms`,
    )
  }
})
