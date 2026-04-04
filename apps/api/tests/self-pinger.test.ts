import { afterEach, describe, expect, it, vi } from 'vitest'

import { startSelfPinger } from '../src/utils/self-pinger.js'

describe('startSelfPinger', () => {
  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it('does not start when disabled', () => {
    const fetchMock = vi.fn()

    const handle = startSelfPinger({
      enabled: false,
      baseUrl: 'https://api.example.com',
      intervalMs: 1000,
      timeoutMs: 500,
      fetchImpl: fetchMock,
    })

    expect(handle).toBeNull()
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('starts and pings on interval', async () => {
    vi.useFakeTimers()
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 200 } as Response)

    const handle = startSelfPinger({
      enabled: true,
      baseUrl: 'https://api.example.com/',
      intervalMs: 1000,
      timeoutMs: 500,
      runOnStart: false,
      fetchImpl: fetchMock,
    })

    expect(handle).not.toBeNull()
    expect(handle?.endpoint).toBe('https://api.example.com/api/health')
    expect(fetchMock).not.toHaveBeenCalled()

    await vi.advanceTimersByTimeAsync(1000)
    await Promise.resolve()

    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.example.com/api/health',
      expect.objectContaining({ method: 'GET' }),
    )

    handle?.stop()

    await vi.advanceTimersByTimeAsync(2000)
    await Promise.resolve()

    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('skips startup when no base url is available', () => {
    const logger = { log: vi.fn(), warn: vi.fn() }

    const handle = startSelfPinger({
      enabled: true,
      intervalMs: 1000,
      timeoutMs: 500,
      logger,
      fetchImpl: vi.fn(),
    })

    expect(handle).toBeNull()
    expect(logger.warn).toHaveBeenCalledWith(
      '[ADA API] Self-pinger skipped: set SELF_PING_BASE_URL or provide RENDER_EXTERNAL_URL',
    )
  })

  it('logs warning when health endpoint returns non-OK response', async () => {
    const logger = { log: vi.fn(), warn: vi.fn() }
    const fetchMock = vi.fn().mockResolvedValue({ ok: false, status: 503 } as Response)

    const handle = startSelfPinger({
      enabled: true,
      baseUrl: 'https://api.example.com',
      intervalMs: 10_000,
      timeoutMs: 500,
      runOnStart: false,
      logger,
      fetchImpl: fetchMock,
    })

    await handle?.ping()

    expect(logger.warn).toHaveBeenCalledWith(
      '[ADA API] Self-pinger warning: https://api.example.com/api/health returned 503',
    )

    handle?.stop()
  })

  it('logs warning when ping request fails', async () => {
    const logger = { log: vi.fn(), warn: vi.fn() }
    const fetchMock = vi.fn().mockRejectedValue(new Error('network down'))

    const handle = startSelfPinger({
      enabled: true,
      baseUrl: 'https://api.example.com',
      intervalMs: 10_000,
      timeoutMs: 500,
      runOnStart: false,
      logger,
      fetchImpl: fetchMock,
    })

    await handle?.ping()

    expect(logger.warn).toHaveBeenCalledWith('[ADA API] Self-pinger request failed: network down')

    handle?.stop()
  })
})
