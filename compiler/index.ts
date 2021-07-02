import { task, parallel } from 'gulp'
import { compileLess } from './lessTask'
import { compileScripts } from './scriptsTask'
import { clean } from './cleanTask'

const compileVue3UiLib = parallel(clean, compileLess, compileScripts)

task('compileVue3UiLib', compileVue3UiLib)
