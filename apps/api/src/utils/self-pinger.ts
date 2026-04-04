type FetchLike = (input: string, init?: RequestInit) => Promise<Response>

interface LoggerLike {
  log: (message: string) => void
  warn: (message: string) => void
}

export interface SelfPingerOptions {
  enabled: boolean
  baseUrl?: string
  fallbackBaseUrl?: string
  intervalMs: number
  timeoutMs: number
  runOnStart?: boolean
  fetchImpl?: FetchLike
  logger?: LoggerLike
}

export interface SelfPingerHandle {
  endpoint: string
  ping: () => Promise<void>
  stop: () => void
}

const HEALTH_PATH = '/api/health'

function toHealthEndpoint(baseUrl: string): string {
  return `${baseUrl.replace(/\/+$/, '')}${HEALTH_PATH}`
}

export function startSelfPinger(options: SelfPingerOptions): SelfPingerHandle | null {
  if (!options.enabled) {
    return null
  }

  const logger = options.logger ?? console
  const fetchImpl = options.fetchImpl ?? globalThis.fetch

  if (!fetchImpl) {
    logger.warn('[ADA API] Self-pinger skipped: fetch is not available in this runtime')
    return null
  }

  const baseUrl = options.baseUrl ?? options.fallbackBaseUrl
  if (!baseUrl) {
    logger.warn(
      '[ADA API] Self-pinger skipped: set SELF_PING_BASE_URL or provide RENDER_EXTERNAL_URL',
    )
    return null
  }

  const endpoint = toHealthEndpoint(baseUrl)
  const intervalMs = Math.max(options.intervalMs, 1)
  const timeoutMs = Math.max(options.timeoutMs, 1)
  let intervalId: ReturnType<typeof setInterval> | null = null

  const ping = async (): Promise<void> => {
    const abortController = new AbortController()
    const timeoutId = setTimeout(() => abortController.abort(), timeoutMs)

    try {
      const response = await fetchImpl(endpoint, {
        method: 'GET',
        signal: abortController.signal,
      })

      if (!response.ok) {
        logger.warn(`[ADA API] Self-pinger warning: ${endpoint} returned ${response.status}`)
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      logger.warn(`[ADA API] Self-pinger request failed: ${message}`)
    } finally {
      clearTimeout(timeoutId)
    }
  }

  intervalId = setInterval(() => {
    void ping()
  }, intervalMs)
  intervalId.unref?.()

  if (options.runOnStart !== false) {
    void ping()
  }

  return {
    endpoint,
    ping,
    stop: () => {
      if (!intervalId) {
        return
      }

      clearInterval(intervalId)
      intervalId = null
    },
  }
}
