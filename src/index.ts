#!/usr/bin/env node

// tslint:disable no-console
import * as commander from 'commander'

import { setupCli } from './setupCli'

const program = new commander.Command()

;(async () => {
  try {
    setupCli(program)
    if (process.argv.length > 2) {
      await program.parseAsync(process.argv)
    } else {
      program.outputHelp()
    }
  } catch (error) {
    console.error(error)
    program.outputHelp()
    process.exit(1)
  }
})()

/**
 * Prayer:
 *  Gloria Patri, et Filio, et Spiritui Sancto, sicut erat in principio
 *  et nunc et semper et in saecula saeculorum. Amen.
 *  In te, Domine, speravi: non confundar in aeternum.
 */
