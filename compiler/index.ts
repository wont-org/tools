import { task, parallel } from 'gulp'
import { compileLess } from './lessTask'
import { compileScripts } from './scriptsTask'
import { clean } from './cleanTask'

const compileVue3 = parallel(clean, compileLess, compileScripts)

task('compileVue3', compileVue3)
