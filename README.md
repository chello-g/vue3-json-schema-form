# vue3-json-schema-form

# 1. Project setup

```js
npm install
npm run serve  // Compiles and hot-reloads for development
npm run build // Compiles and minifies for production
npm run test:unit // Run your unit tests
npm run lint // Lints and fixes files
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

# 2. vueCli 版本 4.5.x

# 3. 使用 jsx 开发 vue3 组件

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

# 4. JSON-schema 使用

```js
cnpm install ajv  // 安装ajv
cnpm install ajv-i18n // 安装ajv-i18n
```

创建`.eslintignore` 文件，忽略 schema-tests 文件夹下的 eslint 校验

# 5. 配置 husky

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

# 6. git 提交规范

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

# 7. API 设计

```js
<JsonSchemaForm
  schema={schema}
  value={value}
  onChange={handleChange}
  locale={locale}
  contextRef={someRef}
  uiSchema={uiSchema}
/>
```

### schema

json schema 对象，用来定义数据，同时也是我们定义表单的依据

### value

表单的数据结果，你可以从外部改变这个 value，在表单被编辑的时候，会通过`onChange`透出 value

需要注意的是，因为 vue 使用的是可变数据，如果每次数据变化我们都去改变`value`的对象地址，那么会导致整个表单都需要重新渲染，这会导致性能降低。
从实践中来看，我们传入的对象，在内部修改其 field 的值基本不会有什么副作用，所以我们会使用这种方式来进行实现。也就是说，如果`value`是一个对象，
那么从`JsonSchemaForm`内部修改的值，并不会改变`value`对象本身。我们仍然会触发`onChange`，因为可能在表单变化之后，使用者需要进行一些操作。

### onChange

在表单值有任何变化的时候会触发该回调方法，并把新的值进行返回

### locale

语言，使用`ajv-i18n`指定错误信息使用的语言

### contextRef

你需要传入一个 vue3 的`Ref`对象，我们会在这个对象上挂载`doValidate`方法，你可以通过

```ts
const yourRef = ref({})

onMounted(() => {
  yourRef.value.doValidate()
})

<JsonSchemaForm contextRef={yourRef} />
```

这样来主动让表单进行校验。

### uiSchema

对表单的展现进行一些定制，其类型如下：

```ts
export interface VueJsonSchemaConfig {
  title?: string
  descrription?: string
  component?: string
  additionProps?: {
    [key: string]: any
  }
  withFormItem?: boolean
  widget?: 'checkbox' | 'textarea' | 'select' | 'radio' | 'range' | string
  items?: UISchema | UISchema[]
}
export interface UISchema extends VueJsonSchemaConfig {
  properties?: {
    [property: string]: UISchema
  }
}
```

# 8. 目录介绍

- lib 文件夹：业务
- src 文件夹：案列
