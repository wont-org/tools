import { task, parallel, series } from 'gulp'
import { less2css, copyLess } from './lessTask'
import { genEntry, genUtilsEntry } from '../utils/fs'
import { compileESM, compileCJS, genTypes } from './scriptsTask'
import { clean } from './cleanTask'
import { rollupCompileAll } from './scriptsRollup'

const compileLess = parallel(less2css, copyLess)
const compileScripts = parallel(genEntry, compileESM, compileCJS, genTypes)

const compileUiComponents = series(clean, parallel(compileLess, compileScripts))
const compileUiComponentsWithRollup = series(
    clean,
    parallel(compileLess, rollupCompileAll)
)
const compileUtilsWithRollup = series(
    clean,
    parallel(genUtilsEntry, rollupCompileAll)
)

task('compileUiComponents', compileUiComponents)
task('compileUiComponentsWithRollup', compileUiComponentsWithRollup)
task('compileUtilsWithRollup', compileUtilsWithRollup)
