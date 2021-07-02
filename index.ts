#!/usr/bin/env node

import { program } from 'commander'
import { version as pkgVersion, name } from './package.json'

import { runTask } from './utils/runTask'
import './compiler'

program.version(`${name} ${pkgVersion}`)

program
    .command('compileVue3')
    .description('Compile a vue3 ui components library')
    .action(() => {
        runTask('compileVue3UiLib')
    })

program.parse()
