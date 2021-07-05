export type ModuleType = 'esm' | 'cjs'
export type Frame = 'vue2' | 'vue3' | 'react16' | 'func'

export const getBabelConfig = (module: ModuleType, frame: Frame) => {
    const antd = [
        'import',
        {
            libraryName: 'ant-design-vue',
            libraryDirectory: module === 'esm' ? 'es' : 'lib',
            style: 'css', // or 'css'
        },
    ]
    // 内置所有预设，比如?. ??，无需再装 @babel/plugin-proposal-optional-chaining
    const presetEnv =
        module === 'cjs'
            ? '@babel/preset-env'
            : [
                  '@babel/preset-env',
                  {
                      // esm模块不转换为require
                      modules: false,
                  },
              ]
    const presets = [presetEnv, '@babel/preset-typescript']

    const plugins: any[] = [
        antd,
        [
            '@babel/plugin-transform-runtime',
            {
                helpers: false,
                // No longer need, see detail https://babeljs.io/docs/en/babel-plugin-transform-runtime#useesmodules
                // useESModules: true,
            },
        ],
    ]
    if (frame === 'vue3') {
        // https://github.com/vuejs/jsx-next
        const vue3Plugins = [
            '@vue/babel-plugin-jsx',
            {
                // 防止合并为数组
                mergeProps: false,
                // 去掉 _isSlot
                enableObjectSlots: true,
            },
        ]
        plugins.push(vue3Plugins)
    }
    if (frame === 'react16') {
        const reactPresets = ['@babel/preset-react']
        presets.push(reactPresets)
    }

    const babelConfig = {
        presets,
        plugins,
        babelrc: false,
    }
    // console.log('module, babelConfig :>> ', module, babelConfig)
    return babelConfig
}
