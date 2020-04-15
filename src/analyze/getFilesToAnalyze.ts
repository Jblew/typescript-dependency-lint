import * as glob from 'glob'

import { Config } from '../Config'

export async function getFilesToAnalyze(
  globPattern: string,
  config: Config,
): Promise<string[]> {
  const globOptions = {
    ignore: config.ignore,
    matchBase: true,
  }
  return new Promise((resolve, reject) =>
    glob(globPattern, globOptions, (err, matches) => {
      if (err) reject(err)
      else resolve(matches)
    }),
  )
}
