import * as fs from 'fs'
import * as paths from 'path'
import { createMatchPath } from 'tsconfig-paths'

import { TSConfigBaseStructure } from '../util/TSConfigBaseStructure'

export function resolveImport(params: Params): string | undefined {
  const resolvedLocal = resolveLocal(params)
  if (resolvedLocal) return resolvedLocal

  const resolvedWithTsconfig = resolveWithTsconfigPaths(params)
  if (resolvedWithTsconfig) return resolvedWithTsconfig

  if (isLibraryImport(params)) return params.importPath

  throw new Error(
    `Cannot resolve import ` +
      `'${params.importPath}' in '${params.contextPath}'`,
  )
}

interface Params {
  tsconfig: TSConfigBaseStructure
  importPath: string
  contextPath: string
}

function resolveLocal({ importPath, contextPath }: Params): string | undefined {
  const contextDir = paths.dirname(contextPath)
  const path = paths.resolve(paths.resolve(contextDir, importPath))
  if (fs.existsSync(path)) return path

  const pathWithTsExtension = `${path}.ts`
  if (fs.existsSync(pathWithTsExtension)) return pathWithTsExtension

  return undefined
}

function resolveWithTsconfigPaths({
  tsconfig,
  importPath,
  contextPath,
}: Params): string | undefined {
  const matcher = createMatchPath(
    tsconfig.absoluteBaseUrl,
    tsconfig.compilerOptions.paths,
  )
  return matcher(importPath)
}

function isLibraryImport(_: Params): boolean {
  // for now. Later we may consider resolving with package.json
  return true
}
