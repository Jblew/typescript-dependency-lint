// tslint:disable no-console

import * as fs from 'fs'
import * as paths from 'path'

import { TSConfigBaseStructure } from '../util/TSConfigBaseStructure'

export function presentDependencies(
  imports: Record<string, (string | undefined)[]>,
  tsconfig: TSConfigBaseStructure,
) {
  const byDestination = getByDestination(imports)

  const relativePath = relativePathFactory(tsconfig.absoluteBaseUrl)

  console.log('# By destination')
  for (const destination of Object.keys(byDestination)) {
    console.log(`# ${relativePath(destination)}`)
    for (const source of byDestination[destination]) {
      console.log(`  - ${relativePath(source)}`)
    }
    console.log()
  }

  console.log()
  console.log()
  console.log()
  console.log()
  console.log()
  console.log('# By source')
  for (const source of Object.keys(imports)) {
    if (imports[source].filter(srcPath => !!srcPath).length === 0) continue
    console.log()
    console.log(`# ${relativePath(source)}`)
    for (const destination of imports[source]) {
      if (!destination) continue
      console.log(`  - ${relativePath(destination)}`)
    }
    console.log()
  }
}

function getByDestination(
  imports: Record<string, (string | undefined)[]>,
): Record<string, Set<string>> {
  const byDestination: Record<string, Set<string>> = {}
  Object.keys(imports).forEach(source =>
    imports[source].forEach(destination => {
      if (!destination) return
      if (!byDestination[destination]) byDestination[destination] = new Set()
      byDestination[destination].add(source)
    }),
  )
  return byDestination
}

const relativePathFactory = (basePath: string) => (path: string) =>
  fs.existsSync(path) ? `/` + paths.relative(basePath, path) : path
