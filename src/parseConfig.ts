import ow from 'ow'

import { Config } from './Config'
import { owFileExists, owIValidJson } from './util/ow'

export function parseConfig(c?: string): Config {
  ow(c, 'Config', ow.string.nonEmpty)
  ow(c, 'Config', owIValidJson)

  const config: Config = JSON.parse(c!)
  ow(config.tsconfigPath, 'Config.tsconfigPath', ow.string)
  ow(config.tsconfigPath, 'Config.tsconfigPath', owFileExists)
  ow(config.ignore, 'Config.ignore', ow.array.ofType(ow.string.nonEmpty))

  return config
}
