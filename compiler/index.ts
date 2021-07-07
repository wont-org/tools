import { task, parallel, series } from 'gulp'
import { compileLess } from './lessTask'
import { genEntry, genUtilsEntry } from '../utils/fs'
import { compileScripts, genTypes } from './scriptsTask'
import { clean } from './cleanTask'
import { rollupCompileAll } from './scriptsRollup'

const compileUiComponents = parallel(
    clean,
    compileLess,
    compileScripts,
    genTypes
)
const compileUiComponentsWithRollup = parallel(
    clean,
    compileLess,
    series(rollupCompileAll, genEntry)
)
const compileUtilsWithRollup = parallel(
    clean,
    series(genUtilsEntry, rollupCompileAll)
)

task('compileUiComponents', compileUiComponents)
task('compileUiComponentsWithRollup', compileUiComponentsWithRollup)
task('compileUtilsWithRollup', compileUtilsWithRollup)
