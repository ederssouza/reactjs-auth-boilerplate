import { execSync } from 'child_process'

const stagedFiles = process.argv.slice(2)
const tsFiles = stagedFiles.filter(
  (file) => file.endsWith('.ts') || file.endsWith('.tsx')
)

if (tsFiles.length > 0) {
  execSync('tsc --project ./tsconfig.json --noEmit', { stdio: 'inherit' })
}
