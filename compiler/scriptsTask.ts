import { CONFIG, OUTPUT, ENTRY } from './../utils/const'
import { src, dest, series, parallel } from 'gulp'
import babel from 'gulp-babel'
import typescript from 'gulp-typescript'
import { exec } from 'child_process'
import through2 from 'through2'
import { getBabelConfig } from '../config/babel.config'

import { genEntry } from '../utils/fs'
import { ModuleType } from '../utils/types'
import { declareDts } from '../config/tsconfig'

function cssInjection(content) {
    return content.replace(/\.less/g, '.css')
}

function compile(babelEnv: ModuleType, destDir: string) {
    const babelConfig = getBabelConfig(babelEnv)

    // console.log('scripts', ENTRY.scripts)
    // console.log('babelConfig :>> ', babelConfig)
    const tsProject = typescript.createProject(
        CONFIG.tsconfig,
        declareDts(babelEnv)
    )
    return src(ENTRY.scripts)
        .pipe(tsProject())
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
    return compile('esm', OUTPUT.es)
}
function compileCJS() {
    return compile('cjs', OUTPUT.cjs)
}

export async function genTypes() {
    exec(
        'npx tsc -p tsconfig.json --declaration --emitDeclarationOnly --module esnext --declarationDir es',
        (error) => {
            if (error) {
                // console.error('genEsTypes error :>> ', error)
                process.exit(1)
            }
        }
    )
    exec(
        'npx tsc -p tsconfig.json --declaration --emitDeclarationOnly --module commonjs --declarationDir lib',
        (error) => {
            if (error) {
                // console.error('genlibTypes error :>> ', error)
                process.exit(1)
            }
        }
    )
}

export const compileScripts = series(parallel(genEntry, compileESM, compileCJS))
