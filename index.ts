#!/usr/bin/env node

import { program } from 'commander'
import { version as pkgVersion, name } from './package.json'

import { FRAME, UI_LIB } from './utils/const'
import { log } from './utils/logger'
import { runTask } from './utils/runTask'
import { Frame } from './utils/types'

import './compiler'

program.version(`${name} ${pkgVersion}`)

program
    .command('compile <frame>')
    .description(
        `Compile a ui components library. (frame choices: ${FRAME.list}`
    )
    .option('-e --entry [entry]', 'Compile library dir', 'components')
    // as any should be string[], but commander is not...
    .option(
        '-d --depends [depends...]',
        'if your library base on ant-design-vue'
    )
    .option(
        '-r --rollup',
        'if your wanna compile library with rollup, this option not support with -d xxx'
    )
    .action(async (frame: Frame, opts) => {
        if (!FRAME.list.includes(frame)) {
            log.error({
                text: `Expect oneOf ${FRAME.list}, but got ${frame}`,
            })
            process.exit(1)
        }
        // check input if not support
        const { depends = [], rollup } = opts
        for (const dep of depends) {
            if (dep && !UI_LIB.includes(dep)) {
                log.error({
                    text: `Expect oneOf ${UI_LIB}, but got ${depends}, ${dep} is not support`,
                })
                process.exit(1)
            }
        }
        if (frame === 'utils') {
            runTask('compileUtilsWithRollup')
            return
        }
        if (rollup) {
            runTask('compileUiComponentsWithRollup')
            return
        }
        runTask('compileUiComponents')
    })

program.parse()
