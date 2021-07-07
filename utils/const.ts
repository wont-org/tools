import glob from 'glob'
import { join } from 'path'
import { existsSync } from 'fs'
import { parseArgvOpt } from './common'
import { log } from './logger'

export const FRAME = {
    name: process.argv[3],
    list: ['vue2', 'vue3', 'react16', 'utils'] as const,
}

export const UI_LIB = ['antd']

export const ARGV = parseArgvOpt()
export const CWD = process.cwd()

// compile library root dir name
const ENTRY_DIR_NAME = ARGV['-e'] || ARGV['--entry'] || 'components'
const ENTRY_DIR_PATH = join(CWD, `./${ENTRY_DIR_NAME}`)

if (!existsSync(ENTRY_DIR_PATH)) {
    log.error({
        text: `Compile entry dirname ${ENTRY_DIR_NAME} is not exist!!!`,
    })
    process.exit(1)
}

const UI_INDEX = join(CWD, `./${ENTRY_DIR_NAME}/index.tsx`)
const FUNC_INDEX = join(CWD, `./${ENTRY_DIR_NAME}/index.ts`)

export const DESC = '// 此文件是脚本自动生成，请勿在此修改 \n\n'

export const CONFIG = {
    tsconfig: join(CWD, 'tsconfig.json'),
}

export const ENTRY = {
    less: glob.sync(join(CWD, `./${ENTRY_DIR_NAME}/**/*.less`)) || [],
    UI_INDEX,
    tsx: glob.sync(join(CWD, `./${ENTRY_DIR_NAME}/**/index.tsx`), {
        ignore: [
            // resolve('../components/**/*.stories.tsx'),
            // resolve('../components/**/__tests__/*.test.tsx'),
            UI_INDEX,
            FUNC_INDEX,
        ],
    }),
    scripts: [
        `${join(CWD, `./${ENTRY_DIR_NAME}`)}/**/*.[jt]s?(x)`,
        `!${join(CWD, `./${ENTRY_DIR_NAME}`)}/**/__tests__/**/*.[jt]s?(x)`,
        `!${join(CWD, `./${ENTRY_DIR_NAME}`)}/**/?(*.)+(spec|test).[tj]s?(x)`,
        `!${join(CWD, `./${ENTRY_DIR_NAME}`)}/**/*.stories.tsx`,
    ],
    dirPath: ENTRY_DIR_PATH,
}

export const OUTPUT = {
    es: join(CWD, `./es`),
    cjs: join(CWD, `./lib`),
    umd: join(CWD, `./dist`),
}
