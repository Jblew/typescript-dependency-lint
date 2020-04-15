import { Config } from '../Config'

import { getFilesToAnalyze } from './getFilesToAnalyze'
import { getImports } from './getImports'
import { readTSConfig } from './readTSConfig'

export async function analyzeDependencies(globPattern: string, config: Config) {
  const tsconfig = readTSConfig(config.tsconfigPath)
  const filesToAnalyze = await getFilesToAnalyze(globPattern, config)
  const imports = filesToAnalyze.reduce(
    (accumulated, path) => ({ ...accumulated, [path]: getImports(path) }),
    {} as Record<string, string[]>,
  )

  // tslint:disable no-console
  console.log(imports)
}
