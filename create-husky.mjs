import { promises as fs } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// Skip if in production or CI environment
if (process.env.NODE_ENV === 'production' || process.env.CI === 'true') {
  process.exit(0)
}

const husky = (await import('husky')).default
husky()

// Use the current working directory (the root of the project)
const rootDir = process.cwd()

// Define the path for the .husky folder in the root directory
const huskyDir = path.join(rootDir, '.husky')
const underscoreDir = path.join(huskyDir, '_')

// Define paths for the commit-msg and pre-commit hooks
const commitMsgHookPath = path.join(huskyDir, 'commit-msg')
const preCommitHookPath = path.join(huskyDir, 'pre-commit')

// Ensure the .husky directory exists
try {
  await fs.access(huskyDir)
} catch {
  await fs.mkdir(huskyDir)
  console.log('✅ .husky directory created')
}

// Check if .husky/commit-msg exists, if not, create it
try {
  await fs.access(commitMsgHookPath)
  console.log('✅ commit-msg hook already exists')
} catch {
  await fs.writeFile(
    commitMsgHookPath,
    `#!/bin/sh
npx --no-install commitlint --edit "$1"

echo "✅ commit-msg hook ran"`
  )
  await fs.chmod(commitMsgHookPath, 0o755)
  console.log('✅ commit-msg hook created')
}

// Check if .husky/pre-commit exists, if not, create it
try {
  await fs.access(preCommitHookPath)
  console.log('✅ pre-commit hook already exists')
} catch {
  await fs.writeFile(
    preCommitHookPath,
    `#!/bin/sh
npm test
#npx eslint . --ext .js,.jsx,.ts,.tsx
#npx prettier --write .
#npx tsc --noEmit

echo "✅ pre-commit hook ran"`
  )
  await fs.chmod(preCommitHookPath, 0o755)
  console.log('✅ pre-commit hook created')
}
