# tools（WIP）

Tools to Build library for vue2、vue3、react&lt;17、utils，using gulp、babel、rollup

# Usage

## install

```bash
npm i @wont/tools -D
```

## compile ui library

```bash
wont-tools compile <frame> [options]
wont-tools compile vue3 -d antd
wont-tools compile react16 -r
```

### frame 必填

frame 可选为 'vue2', 'vue3', 'react16', 'func', 目前仅支持 vue3, react16

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

# test case

[@wont/react-ui](https://github.com/wont-org/react-ui)

# TODO

-   [x] vue3+tsx ui library
-   [ ] vue2 ui library, is it still necessary?
-   [x] react<17 ui library
-   [ ] rollup compile, less files output plugin
-   [ ] func ui library
-   [ ] npm version command
-   [ ] tag command
-   [ ] lint command
-   [ ] prettier command
-   [ ] create command
-   [ ] changelog command
-   [ ] docs command
