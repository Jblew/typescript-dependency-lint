import * as fs from 'fs'
import * as paths from 'path'

import { TSConfigBaseStructure } from '../util/TSConfigBaseStructure'

export function readTSConfig(tsconfigPath: string): TSConfigBaseStructure {
  const tsconfigStruct: TSConfigBaseStructure = JSON.parse(
    fs.readFileSync(tsconfigPath, 'utf8').toString(),
  )

  const absoluteTsconfigPath = paths.resolve(tsconfigPath)
  tsconfigStruct.absoluteBaseUrl = paths.dirname(
    paths.resolve(
      paths.relative(
        tsconfigStruct.compilerOptions.baseUrl,
        absoluteTsconfigPath,
      ),
    ),
  )

  // tslint:disable no-console
  console.log(tsconfigStruct)
  return tsconfigStruct
}
