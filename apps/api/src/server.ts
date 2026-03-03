import app from './app.js'
import { env } from './config/env.js'

app.listen(env.PORT, () => {
  console.log(`[ADA API] Server running on http://localhost:${env.PORT}`)
  console.log(`[ADA API] Environment: ${env.NODE_ENV}`)
})
