import { task, parallel } from 'gulp'
import { compileLess } from './lessTask'
import { compileScripts } from './scriptsTask'
import { clean } from './cleanTask'

const compileUiComponents = parallel(clean, compileLess, compileScripts)

task('compileUiComponents', compileUiComponents)
