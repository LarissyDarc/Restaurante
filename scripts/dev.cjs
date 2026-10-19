const { spawn } = require('node:child_process')
const path = require('node:path')

const root = path.resolve(__dirname, '..')
const children = [
  spawn(process.execPath, [path.join(root, 'server/index.cjs')], { cwd: root, stdio: 'inherit' }),
  spawn(process.execPath, [path.join(root, 'node_modules/vite/bin/vite.js'), ...process.argv.slice(2)], { cwd: root, stdio: 'inherit' })
]

let stopping = false

function stopChildren(exitCode = 0) {
  if (stopping) return
  stopping = true
  for (const child of children) {
    if (child.exitCode === null) child.kill()
  }
  process.exitCode = exitCode
}

for (const child of children) {
  child.on('error', (error) => {
    console.error(error)
    stopChildren(1)
  })
  child.on('exit', (code) => {
    if (!stopping) stopChildren(code || 0)
  })
}

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => stopChildren(0))
}