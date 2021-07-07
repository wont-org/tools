import { RollupOptions } from 'rollup'
import commonjs from '@rollup/plugin-commonjs'
import resolvePlugin from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'
import babel from '@rollup/plugin-babel'
import typescript from '@rollup/plugin-typescript'
import less from 'rollup-plugin-less'
import { terser } from 'rollup-plugin-terser'
import { ENTRY, OUTPUT, CONFIG, SUFFIX, ENTRY_DIR_NAME } from '../utils/const'
import { getDirName } from '../utils/fs'
import { getBabelConfig } from '../config/babel.config'
import { ModuleType } from '../utils/types'
import { declareDts } from './tsconfig'

const extensions = ['.ts', '.tsx', '.jsx', '.js', '.less', '.css']

const external = [
    'lodash',
    '@ant-design/icons-vue',
    /ant-design-vue/,
    'react',
    'prop-types',
    'classnames',
    '@wont/utils',
    /@babel\/runtime/,
    'vue',
    'moment',
    'vue3-emotion',
]

// const vue3External = [
//     'vue',
//     'ant-design-vue',
// ]

interface GenPluginsOpt {
    useTerser?: boolean
    useLess?: boolean
    moduleType: ModuleType
}

function genPlugins(opt: GenPluginsOpt) {
    const { useTerser = false, moduleType, useLess = true } = opt
    const babelConfig = getBabelConfig(moduleType)
    const plugins = [
        json(),
        resolvePlugin({
            moduleDirectories: [ENTRY.dirPath],
            extensions,
        }),
        commonjs(),
        typescript({
            tsconfig: CONFIG.tsconfig,
            ...declareDts(moduleType),
        }),
        babel({
            ...babelConfig,
            exclude: 'node_modules/**',
            extensions,
            // https://github.com/rollup/plugins/tree/master/packages/babel
            babelHelpers: 'runtime',
        }),
    ]
    if (useLess) {
        plugins.unshift(
            less({
                output: false,
            })
        )
    }
    if (useTerser) {
        plugins.push(terser())
    }
    return plugins
}

function entryFileNames(params) {
    const { facadeModuleId = '' } = params
    if (
        facadeModuleId &&
        facadeModuleId.indexOf(`${ENTRY_DIR_NAME}/index.${SUFFIX}`) !== -1
    ) {
        return 'index.js'
    }
    return '[name]/index.js'
}

const getRollupInput = () => {
    const namedInputs: Record<string, string> = {}
    const components = ENTRY[SUFFIX].map((file) => {
        const name = getDirName(file)
        namedInputs[name] = file
        return {
            name,
            path: file,
        }
    })
    namedInputs.index = ENTRY.INDEX
    return {
        namedInputs,
        components,
    }
}

export const getRollupConfig = () => {
    const { namedInputs } = getRollupInput()
    const rollupConfig: RollupOptions[] = [
        {
            input: namedInputs,
            output: {
                dir: OUTPUT.es,
                entryFileNames,
                format: 'esm',
                exports: 'auto',
            },
            external,
            plugins: genPlugins({
                moduleType: 'esm',
            }),
        },
        {
            input: namedInputs,
            output: {
                dir: OUTPUT.cjs,
                entryFileNames,
                format: 'cjs',
                exports: 'auto',
            },
            external,
            plugins: genPlugins({
                moduleType: 'cjs',
            }),
        },
    ]
    return rollupConfig
}
