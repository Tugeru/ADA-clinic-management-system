import net from 'node:net'
import { spawn } from 'node:child_process'

function getPnpmCommand() {
  if (process.env.npm_execpath) {
    return {
      command: process.execPath,
      argsPrefix: [process.env.npm_execpath],
    }
  }

  return {
    command: process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm',
    argsPrefix: [],
  }
}

function findFreePort() {
  return new Promise((resolve, reject) => {
    const server = net.createServer()
    server.unref()
    server.on('error', reject)
    server.listen(0, '127.0.0.1', () => {
      const address = server.address()
      if (address && typeof address === 'object') {
        const port = address.port
        server.close(() => resolve(port))
        return
      }
      server.close(() => reject(new Error('Unable to determine a free port')))
    })
  })
}

function run(command, args, env) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: 'inherit',
      shell: false,
      env: {
        ...process.env,
        ...env,
      },
    })

    child.on('error', reject)
    child.on('exit', (code, signal) => {
      if (code === 0) {
        resolve()
        return
      }

      reject(new Error(signal ? `Command terminated with signal ${signal}` : `Command exited with code ${code}`))
    })
  })
}

async function main() {
  const apiPort = await findFreePort()
  const webPort = await findFreePort()
  const apiBaseUrl = `http://localhost:${apiPort}/api`
  const webOrigin = `http://localhost:${webPort}`
  const pnpm = getPnpmCommand()

  await run(pnpm.command, [...pnpm.argsPrefix, 'build:all'], {
    VITE_API_BASE_URL: apiBaseUrl,
  })

  const concurrentlyArgs = [
    'exec',
    'concurrently',
    '-k',
    '-n',
    'API,WEB',
    '-c',
    'cyan,teal',
    'pnpm --filter @ada/api start',
    `pnpm --filter @ada/web exec vite preview --port ${webPort}`,
  ]

  const child = spawn(pnpm.command, [...pnpm.argsPrefix, ...concurrentlyArgs], {
    stdio: 'inherit',
    shell: false,
    env: {
      ...process.env,
      PORT: String(apiPort),
      CORS_ORIGIN: webOrigin,
      VITE_API_BASE_URL: apiBaseUrl,
    },
  })

  child.on('error', (error) => {
    console.error(error)
    process.exit(1)
  })

  child.on('exit', (code, signal) => {
    if (signal) {
      process.exit(1)
      return
    }

    process.exit(code ?? 0)
  })
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
