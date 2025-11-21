#!/usr/bin/env node

import { spawnSync } from 'node:child_process'
import { mkdirSync } from 'node:fs'
import { resolve } from 'node:path'

// Skip Prisma generation if DATABASE_URL is not set or if explicitly skipped
if (!process.env.DATABASE_URL || process.env.PRISMA_GENERATE_SKIP === '1') {
  console.log('⏭️  Skipping Prisma generate (DATABASE_URL not set or PRISMA_GENERATE_SKIP=1)')
  process.exit(0)
}

const rootDir = process.cwd()
const cacheDir = resolve(rootDir, '.prisma-cache')
const homeDir = resolve(rootDir, '.prisma-home')
mkdirSync(cacheDir, { recursive: true })
mkdirSync(homeDir, { recursive: true })

const result = spawnSync('npx', ['prisma', 'generate'], {
  stdio: 'inherit',
  env: {
    ...process.env,
    HOME: homeDir,
    XDG_CACHE_HOME: cacheDir,
    PRISMA_ENGINE_CACHE_DIR: cacheDir,
  },
})

if (result.error) {
  throw result.error
}

process.exit(result.status ?? 0)
