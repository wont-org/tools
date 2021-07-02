import glob from 'glob'
import { join } from 'path'

const moduleDir = 'components'

const CWD = process.cwd()
const uiIndex = join(CWD, `./${moduleDir}/index.tsx`)
const funcIndex = join(CWD, `./${moduleDir}/index.ts`)

export const DESC = '// 此文件是脚本自动生成，请勿在此修改 \n\n'

export const FILES = {
    less: glob.sync(join(CWD, `./${moduleDir}/**/*.less`)) || [],
    uiIndex,
    tsx: glob.sync(join(CWD, `./${moduleDir}/**/index.tsx`), {
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
    less: glob.sync(join(CWD, `./${moduleDir}/**/*.less`)) || [],
    scripts: [
        `${join(CWD, `./${moduleDir}`)}/**/*.[jt]s?(x)`,
        `!${join(CWD, `./${moduleDir}`)}/**/__tests__/**/*.[jt]s?(x)`,
        `!${join(CWD, `./${moduleDir}`)}/**/?(*.)+(spec|test).[tj]s?(x)`,
        `!${join(CWD, `./${moduleDir}`)}/**/*.stories.tsx`,
    ],
}

export const OUTPUT = {
    es: join(CWD, `./es`),
    cjs: join(CWD, `./lib`),
    umd: join(CWD, `./dist`),
}
