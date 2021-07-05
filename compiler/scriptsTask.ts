import { src, dest, series, parallel } from 'gulp'
import babel from 'gulp-babel'
import { exec } from 'child_process'
import through2 from 'through2'
import { getBabelConfig } from '../config/getBabelConfig'
import { OUTPUT, ENTRY, FRAME } from '../utils/const'
import { genEntry } from '../utils/fs'
import { Frame, ModuleType } from '../utils/types'
import { log } from '../utils/logger'

function cssInjection(content) {
    return content.replace(/\.less/g, '.css')
}

function compile(babelEnv: ModuleType, frame: Frame, destDir: string) {
    const babelConfig = getBabelConfig(babelEnv, frame)

    // console.log('scripts', ENTRY.scripts)
    // console.log('babelConfig :>> ', babelConfig)

    return src(ENTRY.scripts)
        .pipe(babel(babelConfig))
        .pipe(
            through2.obj(function (file, encoding, next) {
                const content = file.contents.toString(encoding)
                file.contents = Buffer.from(cssInjection(content))
                this.push(file)
                next()
            })
        )
        .pipe(dest(destDir))
}

function compileESM() {
    if (!FRAME.list.includes(FRAME.name as any)) {
        log.error({
            text: `compileESM, expect oneOf ${FRAME.list}, but got ${FRAME.name}`,
        })
        process.exit(1)
    }
    return compile('esm', FRAME.name as Frame, OUTPUT.es)
}
function compileCJS() {
    if (!FRAME.list.includes(FRAME.name as any)) {
        log.error({
            text: `compileESM, expect oneOf ${FRAME.list}, but got ${FRAME.name}`,
        })
        process.exit(1)
    }
    return compile('cjs', FRAME.name as Frame, OUTPUT.es)
}

async function genTypes() {
    exec('npx tsc -p tsconfig.types.json --declarationDir es', (error) => {
        if (error) {
            // console.error('genEsTypes error :>> ', error)
            process.exit(1)
        }
    })
    exec('npx tsc -p tsconfig.types.json --declarationDir lib', (error) => {
        if (error) {
            // console.error('genlibTypes error :>> ', error)
            process.exit(1)
        }
    })
}

export const compileScripts = series(
    parallel(genEntry, genTypes, compileESM, compileCJS)
)
