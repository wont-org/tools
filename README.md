# tools（WIP）

Tools to Build library for vue2、vue3、react&lt;17、utils，using gulp、babel、rollup

# Usage

## install

```bash
npm i @wont/tools -D
```

## compile library

```bash
wont-tools compile <frame> [option]
wont-tools compile vue3 -d antd
wont-tools compile react16 -r
```


| frame   | -d/--depends | antd | -e/--entry dirname | -r/--rollup |
| --------- | :------------- | ------ | -------------------- | ------------- |
| vue     | ✅           | ✅   | ✅                 | ✅          |
| react16 | ✅           | ❌   | ✅                 | ✅          |
| utils   | ❌           | ❌   | ✅                 | ❌          |

### frame 必填

frame 可选为 'vue2', 'vue3', 'react16', 'utils', 目前仅支持 vue3, react16

### options 可选项

以下可选项`-r`与`-d antd`不可组合使用，其他可以任意组合

#### -d/--depends antd

编译组件库依赖于某个组件库，目前`vue3`使用`eslint-plugin-import`集成了`ant-design-vue`

```bash
wont-tools compile vue3 -d antd
# or
wont-tools compile vue3 -depends antd
```

#### -e/--entry dirname

指定组件库文件名，默认为`components`

```bash
wont-tools compile vue3 -e src
# or
wont-tools compile vue3 -entry src
```

#### -r/--rollup

使用`rollup`编译`javascript`
**注意**
使用`rollup`编译的组件库，组件未引入样式文件，要使用[babel-plugin-component](https://www.npmjs.com/package/babel-plugin-component)引入，支持`less`变量定制主题

```bash
wont-tools compile vue3 -r
# or
wont-tools compile vue3 --rollup
```

# Test case

[@wont/react-ui](https://github.com/wont-org/react-ui/tree/test/tools)
[@wont/utils](https://github.com/wont-org/utils/tree/test/tools)

# TODO

- [X] vue3+tsx ui library
- [ ] vue2 ui library, is it still necessary?
- [X] react<17 ui library
- [ ] rollup compile, less files output plugin
- [X] utils ui library
- [ ] npm version command
- [ ] tag command
- [ ] lint command
- [ ] prettier command
- [ ] create command
- [ ] changelog command
- [ ] docs command

# 目录示范与生成产物

## utils

目录结构

> - 打包规则`./${ENTRY_DIR_NAME}/!(_)*/!(_)*.ts`
> - 根据以上规则生成index.ts作为入口文件

```bash
── src
│   ├── _common
│   │   ├── const.ts
│   ├── compose
│   │   ├── _compose.test.ts
│   │   └── compose.ts
│   ├── index.ts

```

执行指令

```bash
wont-tools compile utils -e src
```

生成产物

```bash
# esm
├── es
│   ├── compose
│   │   ├── compose.d.ts
│   │   └── index.js
│   ├── index.d.ts
│   ├── index.js
# commonjs
├── lib
│   ├── compose
│   │   ├── compose.d.ts
│   │   └── index.js
│   ├── index.d.ts
│   ├── index.js
```

## ui components

目录结构

> - 打包规则`./${ENTRY_DIR_NAME}/**/index.tsx`
> - 根据以上规则生成index.tsx作为入口文件

```bash
├── components
│   ├── button
│   │   ├── __tests__
│   │   │   ├── __snapshots__
│   │   │   └── button.test.tsx
│   │   ├── index.less
│   │   ├── index.stories.tsx
│   │   └── index.tsx
│   ├── index.tsx
```

执行指令

```bash
wont-tools compile react
```

生成产物

```bash
# esm
├── es
│   ├── button
│   │   ├── index.css
│   │   ├── index.d.ts
│   │   ├── index.js
│   │   └── index.less
│   ├── index.d.ts
│   ├── index.js

# commonjs
├── lib
│   ├── button
│   │   ├── index.css
│   │   ├── index.d.ts
│   │   ├── index.js
│   │   └── index.less
│   ├── index.d.ts
│   ├── index.js
```
