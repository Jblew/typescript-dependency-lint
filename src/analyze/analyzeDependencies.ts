import { Config } from '../Config'

import { getFilesToAnalyze } from './getFilesToAnalyze'
import { readTSConfig } from './readTSConfig'

export async function analyzeDependencies(globPattern: string, config: Config) {
  const tsconfig = readTSConfig(config.tsconfigPath)
  const filesToAnalyze = await getFilesToAnalyze(globPattern, config)

  // tslint:disable no-console
  console.log({
    tsconfig,
    filesToAnalyze,
  })
}
