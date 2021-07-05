import { src, dest, series, parallel } from 'gulp'
import babel from 'gulp-babel'
import { exec } from 'child_process'
import through2 from 'through2'
import { ModuleType, getBabelConfig } from '../config/getBabelConfig'
import { OUTPUT, ENTRY } from '../utils/const'
import { genEntry } from '../utils/fs'

function cssInjection(content) {
    return content.replace(/\.less/g, '.css')
}

function compile(babelEnv: ModuleType, destDir: string) {
    const babelConfig = getBabelConfig(babelEnv, 'vue3')

    // console.log('scripts', ENTRY.scripts)

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

// 不必使用async，避免影响环境变量
async function compileESM() {
    return compile('esm', OUTPUT.es)
}
async function compileCJS() {
    return compile('cjs', OUTPUT.cjs)
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
