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
