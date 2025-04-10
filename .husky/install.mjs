import { promises as fs } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

if (process.env.NODE_ENV === 'production' || process.env.CI === 'true') {
  process.exit(0)
}

const husky = (await import('husky')).default
husky()

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const fullHookPath = path.join(__dirname, '.husky', 'commit-msg')

// Check if .husky/commit-msg exists, if not, create it
try {
  await fs.access(fullHookPath)
  console.log('✅ commit-msg hook already exists')
} catch {
  await fs.writeFile(
    fullHookPath,
    `#!/bin/sh
    . "$(dirname "$0")/_/husky.sh"

    npx commitlint --edit "$1"
    echo "✅ commit-msg hook ran"`
  )
  await fs.chmod(fullHookPath, 0o755)
  console.log('✅ commit-msg hook created')
}
