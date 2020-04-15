import * as fs from 'fs'

import { TSConfigBaseStructure } from '../util/TSConfigBaseStructure'

export function readTSConfig(tsconfigPath: string): TSConfigBaseStructure {
  return JSON.parse(fs.readFileSync(tsconfigPath, 'utf8').toString())
}
