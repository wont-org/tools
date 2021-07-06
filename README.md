# tools（WIP）

Tools to Build library for vue2、vue3、react&lt;17、utils，using gulp、babel、rollup

# Usage

## compile vue3 library

-   base

```bash
wont-tools compile vue3
```

-   depend on ant-design-vue

```bash
wont-tools compile vue3 -d antd
# or
wont-tools compile vue3 -depends antd
```

-   custom entry dirname

```bash
wont-tools compile vue3 -e src
# or
wont-tools compile vue3 -entry src
```

## compile react library

-   base

```bash
wont-tools compile react16
```

<!-- - depend on ant-design-vue
```bash
wont-tools compile vue3 -d antd
``` -->

# test case

[@wont/react-ui](https://github.com/wont-org/react-ui)

# TODO

-   [x] vue3+tsx ui library
-   [ ] vue2 ui library, is it still necessary?
-   [x] react<17 ui library
-   [ ] func ui library
-   [ ] npm version command
-   [ ] tag command
-   [ ] lint command
-   [ ] prettier command
-   [ ] create command
-   [ ] changelog command
-   [ ] docs command
