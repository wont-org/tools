import { task, parallel, series } from 'gulp'
import { compileLess } from './lessTask'
import { genEntry } from '../utils/fs'
import { compileScripts, genTypes } from './scriptsTask'
import { clean } from './cleanTask'
import { rollupCompileAll } from './scriptsRollup'

const compileUiComponents = parallel(clean, compileLess, compileScripts)
const compileUiComponentsWithRollup = parallel(
    clean,
    compileLess,
    series(rollupCompileAll, genTypes, genEntry)
)

task('compileUiComponents', compileUiComponents)
task('compileUiComponentsWithRollup', compileUiComponentsWithRollup)
