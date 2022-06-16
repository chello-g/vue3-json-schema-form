# vue3-json-schema-form

## 1. Project setup

```js
npm install
npm run serve  // Compiles and hot-reloads for development
npm run build // Compiles and minifies for production
npm run test:unit // Run your unit tests
npm run lint // Lints and fixes files
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## 2. vueCli 版本 4.5.x

## 3. 使用 jsx 开发 vue3 组件

[babel-plugin-jsx 地址](https://github.com/vuejs/babel-plugin-jsx)

```js
// 安装jsx编译插件
cnpm install @vue/babel-plugin-jsx -D
// 在babel.config.js中添加配置 babel配置文件有babel.config.js/.babelrc等，也可以写在package.json里面
{
  plugins: ["@vue/babel-plugin-jsx"]
}
```

安装配置完之后就可以在 vue3 中添加 tsx 文件进行 tsx 语法开发了

## 4. JSON-schema 使用

```js
cnpm install ajv  // 安装ajv
cnpm install ajv-i18n // 安装ajv-i18n
```

创建`.eslintignore` 文件，忽略 schema-tests 文件夹下的 eslint 校验

## 5. 配置 husky

[参考](https://typicode.github.io/husky/#/?id=install)

使用 husky 7.

```js
// 1. 基本操作
cnpm install husky --save-dev //Install husky
npx husky install // Enable Git hooks
// package.json中添加
"scripts": {
  "prepare": "husky install"
}

// 2. 添加钩子
npx husky add .husky/pre-commit "lint-staged" // 添加一个新钩子
// package.json中添加
"scripts": {
  "lint-staged": "lint-staged"
}
"lint-staged": {
  "*.{js,jsx,vue,ts,tsx}": [
    "vue-cli-service lint",
    "git add"
  ]
}

npx husky add .husky/commit-msg "node ./scripts/verify-commit-msg.js" // 添加一个新钩子
// 这个还可以写成npx husky add .husky/commit-msg "npm run gitmsglint"
// 然后在package.json的scripts中添加"gitmsglint":"node ./scripts/verify-commit-msg.js"
```

## 6. git 提交规范

```js
{ value: 'feat', name: 'feat:     新功能' },
{ value: 'fix', name: 'fix:      修复' },
{ value: 'docs', name: 'docs:     文档变更' },
{ value: 'style', name: 'style:    代码格式(不影响代码运行的变动)' },
{
  value: 'refactor',
  name: 'refactor: 重构(既不是增加feature，也不是修复bug)'
},
{ value: 'perf', name: 'perf:     性能优化' },
{ value: 'test', name: 'test:     增加测试' },
{ value: 'chore', name: 'chore:    构建过程或辅助工具的变动' },
{ value: 'revert', name: 'revert:   回退' },
{ value: 'build', name: 'build:    打包' }
```
