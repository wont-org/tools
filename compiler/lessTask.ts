import { src, dest, series, parallel } from 'gulp'
import less from 'gulp-less'
import autoprefixer from 'gulp-autoprefixer'
import cssnano from 'gulp-cssnano'
import through2 from 'through2'
// import { Transform } from 'stream'
import { OUTPUT, ENTRY } from '../utils/const'
import { getDirName, getFileName } from '../utils/fs'

function copyLess() {
    return src(ENTRY.less)
        .pipe(
            through2.obj(function (file, encoding, next) {
                const dirName = getDirName(file.path)
                const fileName = getFileName(file.path, '.less')
                const reg = new RegExp(`${fileName}.less$`)
                const name = ['mixins'].includes(dirName)
                    ? `style/${dirName}`
                    : `${dirName}`
                const lessPath = file.path.replace(
                    reg,
                    `${name}/${fileName}.less`
                )
                file.path = lessPath
                this.push(file)
                next()
            })
        )
        .pipe(dest(OUTPUT.es))
        .pipe(dest(OUTPUT.cjs))
}

function less2css() {
    return src(ENTRY.less)
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(cssnano())
        .pipe(
            through2.obj(function (file, encoding, next) {
                const name = getDirName(file.path)
                const reg = /index.css$/
                if (reg.test(file.path)) {
                    const cssPath = file.path.replace(reg, `${name}/index.css`)
                    file.path = cssPath
                    // console.info('this :>> ', this)
                    this.push(file)
                }
                next()
            })
        )
        .pipe(dest(OUTPUT.es))
        .pipe(dest(OUTPUT.cjs))
}

export const compileLess = series(parallel(less2css, copyLess))
