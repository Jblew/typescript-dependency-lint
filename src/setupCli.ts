// tslint:disable no-console
import * as commander from 'commander'

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

  program.command('show [globPattern]').action(async (cmd, options) => {
    console.log({ cmd, options })
  })
}
