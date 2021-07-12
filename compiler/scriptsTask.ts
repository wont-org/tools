import { src, dest } from 'gulp'
import babel from 'gulp-babel'
import { exec } from 'child_process'
import through2 from 'through2'

import { getBabelConfig } from '../config/babel.config'
import { ModuleType } from '../utils/types'
import { CONFIG, OUTPUT, ENTRY } from './../utils/const'

function cssInjection(content) {
    return content.replace(/\.less/g, '.css')
}

function compile(babelEnv: ModuleType, destDir: string) {
    const babelConfig = getBabelConfig(babelEnv)

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

export function compileESM() {
    return compile('esm', OUTPUT.es)
}
export function compileCJS() {
    return compile('cjs', OUTPUT.cjs)
}

export async function genTypes() {
    exec(
        `npx tsc -p ${CONFIG.tsconfig} --declaration --emitDeclarationOnly --module esnext --declarationDir es`,
        (error, stdout, stderr) => {
            if (error) {
                console.error('genEsTypes error :>> ', error, stdout, stderr)
                process.exit(1)
            }
        }
    )
    exec(
        `npx tsc -p ${CONFIG.tsconfig} --declaration --emitDeclarationOnly --module commonjs --declarationDir lib`,
        (error, stdout, stderr) => {
            if (error) {
                console.error('genlibTypes error :>> ', error, stdout, stderr)
                process.exit(1)
            }
        }
    )
}
