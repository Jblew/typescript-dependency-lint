// tslint:disable no-console
import * as commander from 'commander'

import { parseConfig } from './parseConfig'

// tslint:disable no-var-requires
const PACKAGE_JSON: {
  version: string
  name: string
} = require('../package.json')

export function setupCli(program: commander.Command) {
  program
    .name(PACKAGE_JSON.name)
    .version(PACKAGE_JSON.version, '--version')
    .option(
      '--config [json]',
      'Config in escaped JSON format. See README for reference',
    )

  program
    .command('analyze [globPattern]')
    .action(async (globPattern, options) => {
      const config = parseConfig(options.parent.config)
      await analyzeDependencies(globPattern, config)
    })
}
