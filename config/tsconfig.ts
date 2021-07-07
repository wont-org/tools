import { existsSync } from 'fs'
import { CONFIG, ENTRY_DIR_NAME } from '../utils/const'
import { ModuleType } from '../utils/types'

export const declareDts = (babelEnv: ModuleType) => ({
    declaration: true,
    emitDeclarationOnly: true,
    declarationDir: babelEnv === 'esm' ? 'es' : 'lib',
    module: 'esnext',
})

export const getTsconfig = (babelEnv: ModuleType) => {
    const dts = {
        declaration: true,
        emitDeclarationOnly: true,
        declarationDir: babelEnv === 'esm' ? 'es' : 'lib',
        module: 'esnext',
    }
    const result = {
        compilerOptions: {
            target: 'esnext',
            lib: ['dom', 'dom.iterable', 'esnext'],

            // check
            strict: true,
            noImplicitAny: false,
            noImplicitThis: false,
            allowJs: true,
            skipLibCheck: true,
            esModuleInterop: true,
            allowSyntheticDefaultImports: true,
            forceConsistentCasingInFileNames: true,

            moduleResolution: 'node',
            resolveJsonModule: true,
            isolatedModules: true,
            jsx: 'preserve',
            types: ['@types/node'],
            baseUrl: '.',
            ...dts,
        },
        include: [ENTRY_DIR_NAME],
        exclude: [
            `${ENTRY_DIR_NAME}/**/*.stories.tsx`,
            `${ENTRY_DIR_NAME}/**/*.stories.md?(x)`,
            '**/__tests__/**/*.[jt]s?(x)',
            '**/?(*.)+(spec|test).[tj]s?(x)',
        ],
    }
    if (existsSync(CONFIG.tsconfig)) {
        const customTsconfig = require(CONFIG.tsconfig)
        customTsconfig.compilerOptions = {
            ...customTsconfig.compilerOptions,
            ...dts,
        }
        return customTsconfig.compilerOptions
    }
    return result.compilerOptions
}
