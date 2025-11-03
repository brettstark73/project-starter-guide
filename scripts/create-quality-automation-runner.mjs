#!/usr/bin/env node

import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const SMOKE_FLAG = '--smoke'
const DEFAULT_TEMPLATES = ['saas-level-1', 'api-service', 'mobile-app']
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

function parseArgs(rawArgs) {
  const passThrough = []
  const smokeTargets = new Set()

  for (let i = 0; i < rawArgs.length; i += 1) {
    const arg = rawArgs[i]
    if (arg === SMOKE_FLAG || arg.startsWith(`${SMOKE_FLAG}=`)) {
      const value =
        arg === SMOKE_FLAG
          ? rawArgs[i + 1] && !rawArgs[i + 1].startsWith('-')
            ? rawArgs[++i]
            : undefined
          : arg.slice(SMOKE_FLAG.length + 1)

      if (!value || value === 'all') {
        DEFAULT_TEMPLATES.forEach(template => smokeTargets.add(template))
      } else {
        value
          .split(',')
          .map(item => item.trim())
          .filter(Boolean)
          .forEach(template => smokeTargets.add(template))
      }
    } else {
      passThrough.push(arg)
    }
  }

  return { passThrough, smokeTargets: Array.from(smokeTargets) }
}

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    stdio: 'inherit',
    shell: false,
    ...options,
  })

  if (result.error) {
    throw result.error
  }

  if (result.status !== 0) {
    process.exit(result.status ?? 1)
  }
}

function runCreateQualityAutomation(args) {
  const override = process.env.CREATE_QUALITY_AUTOMATION_BIN
  if (override) {
    const [cmd, ...cmdArgs] = override
      .split(' ')
      .map(part => part.trim())
      .filter(Boolean)
    run(cmd, [...cmdArgs, ...args])
    return
  }

  run('npx', ['create-quality-automation@latest', ...args])
}

function runSmokeTests(templates) {
  if (!templates.length) {
    return
  }

  const smokeScript = resolve(__dirname, 'template-smoke-test.sh')
  templates.forEach(template => {
    run(smokeScript, [template], { env: process.env })
  })
}

function main() {
  const { passThrough, smokeTargets } = parseArgs(process.argv.slice(2))

  runCreateQualityAutomation(passThrough)
  runSmokeTests(smokeTargets)
}

main()
