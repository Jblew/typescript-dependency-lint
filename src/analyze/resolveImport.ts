import { createMatchPath } from 'tsconfig-paths'

import { TSConfigBaseStructure } from '../util/TSConfigBaseStructure'

export function resolveImport({
  tsconfig,
  importPath,
  contextPath,
}: {
  tsconfig: TSConfigBaseStructure
  importPath: string
  contextPath: string
}): string | undefined {
  const matcher = createMatchPath(
    tsconfig.absoluteBaseUrl,
    tsconfig.compilerOptions.paths,
  )
  const matched = matcher(importPath)
  // tslint:disable no-console
  console.log({ tsconfig, importPath })
  return matched
}
