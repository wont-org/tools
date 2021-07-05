import glob from 'glob'
import { join } from 'path'
import { existsSync } from 'fs'
import { parseArgvOpt } from './common'
import { log } from './logger'

export const FRAME = {
    name: process.argv[3],
    list: ['vue2', 'vue3', 'react16', 'func'] as const,
}

export const UI_LIB = ['antd']

export const ARGV = parseArgvOpt()
export const CWD = process.cwd()

const entryDirName = ARGV['-e'] || ARGV['--entry'] || 'components'
const entryDirPath = join(CWD, `./${entryDirName}`)

if (!existsSync(entryDirPath)) {
    log.error({
        text: `Compile entry dirname ${entryDirName} is not exist!!!`,
    })
    process.exit(1)
}

const uiIndex = join(CWD, `./${entryDirName}/index.tsx`)
const funcIndex = join(CWD, `./${entryDirName}/index.ts`)

export const DESC = '// 此文件是脚本自动生成，请勿在此修改 \n\n'

export const FILES = {
    less: glob.sync(join(CWD, `./${entryDirName}/**/*.less`)) || [],
    uiIndex,
    tsx: glob.sync(join(CWD, `./${entryDirName}/**/index.tsx`), {
        ignore: [
            // resolve('../components/**/*.stories.tsx'),
            // resolve('../components/**/__tests__/*.test.tsx'),
            uiIndex,
            funcIndex,
        ],
    }),
}

export const ENTRY = {
    // multiTSX: getEntry(FILES.tsx),
    less: glob.sync(join(CWD, `./${entryDirName}/**/*.less`)) || [],
    scripts: [
        `${join(CWD, `./${entryDirName}`)}/**/*.[jt]s?(x)`,
        `!${join(CWD, `./${entryDirName}`)}/**/__tests__/**/*.[jt]s?(x)`,
        `!${join(CWD, `./${entryDirName}`)}/**/?(*.)+(spec|test).[tj]s?(x)`,
        `!${join(CWD, `./${entryDirName}`)}/**/*.stories.tsx`,
    ],
}

export const OUTPUT = {
    es: join(CWD, `./es`),
    cjs: join(CWD, `./lib`),
    umd: join(CWD, `./dist`),
}
