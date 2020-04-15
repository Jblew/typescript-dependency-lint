import * as paths from 'path'

import { Config } from '../Config'

import { getFilesToAnalyze } from './getFilesToAnalyze'
import { getImports } from './getImports'
import { readTSConfig } from './readTSConfig'
import { resolveImport } from './resolveImport'

export async function analyzeDependencies(globPattern: string, config: Config) {
  const tsconfig = readTSConfig(config.tsconfigPath)
  const filesToAnalyze = await getFilesToAnalyze(globPattern, config)

  const getResolvedImports = (contextPath: string) =>
    getImports(contextPath).map(importPath =>
      resolveImport({ tsconfig, importPath, contextPath }),
    )

  const imports = filesToAnalyze.reduce(
    (accumulated, path) => ({
      ...accumulated,
      [path]: getResolvedImports(path),
    }),
    {} as Record<string, (string | undefined)[]>,
  )

  presentImports(imports)
}

function presentImports(imports: Record<string, (string | undefined)[]>) {
  // tslint:disable no-console
  console.log(imports)
}
