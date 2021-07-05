#!/usr/bin/env node

import { program } from 'commander'
import { version as pkgVersion, name } from './package.json'
import { FRAME, UI_LIB } from './utils/const'
import { log } from './utils/logger'

import { runTask } from './utils/runTask'
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
    .action((frame, opts) => {
        if (!FRAME.list.includes(frame)) {
            log.error({
                text: `Expect oneOf ${FRAME.list}, but got ${frame}`,
            })
            process.exit(1)
        }
        // check input if not support
        const { depends = [] } = opts
        for (const dep of depends) {
            if (dep && !UI_LIB.includes(dep)) {
                log.error({
                    text: `Expect oneOf ${UI_LIB}, but got ${depends}, ${dep} is not support`,
                })
                process.exit(1)
            }
        }
        runTask('compileUiComponents')
    })

program.parse()
