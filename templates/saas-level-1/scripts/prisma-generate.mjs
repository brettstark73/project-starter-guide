#!/usr/bin/env node

import { spawnSync } from 'node:child_process'
import { mkdirSync } from 'node:fs'
import { resolve } from 'node:path'

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
