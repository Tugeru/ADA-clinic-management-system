/**
 * server.ts — Entry point
 *
 * Placeholder: starts the HTTP server on the configured port.
 * TODO: implement when backend development begins.
 */
import app from './app.js'

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log(`[server] listening on http://localhost:${PORT}`)
})
