import { createApp, defineComponent, h, reactive } from 'vue'
// import App from './App.vue'

// const App = defineComponent({
//   render() {
//     return 123 // 可以在页面直接渲染出来
//   }
// })

// 使用h函数模拟App.vue中的template
// <div id="#app">
//     <img alt="Vue logo" src="./assets/logo.png" />
//     <HelloWorld :age="20" />
// </div>
// h函数参数：1.标签 2.属性 3.子节点 参考https://v3.cn.vuejs.org/api/global-api.html#h
// h函数 等api的定义可以在vue3源码https://github.com/vuejs/core中进行查看
// h函数 定义在packages/runtime-core/src/h.ts
// 在下面代码中h可以直接替换成createVNode，h函数其实就是createVNode的简单封装
// const img = require('./assets/logo.png') // eslint-disable-line
// import HelloWorld from './components/HelloWorld.vue'
// const App = defineComponent({
//   render() {
//     return h('div', { id: 'app' }, [
//       h('img', { alt: 'Vue logo', src: img }),
//       h(HelloWorld, { age: 22 })
//     ])
//   }
// })

// setup返回render函数的用法例1
// const App = defineComponent({
//   setup() {
//     return () => {
//       return h('div', { id: 'app' }, [
//         h('img', { alt: 'Vue logo', src: img }),
//         h(HelloWorld, { age: 23 })
//       ])
//     }
//   }
// })

// setup返回render函数的用法例2
// const App = defineComponent({
//   setup() {
//     // 这是一个闭包，setup中的东西只在开始的时候渲染一次，state的初始值一直是aaa
//     const state = reactive({
//       name: 'aaa'
//     })
//     setInterval(() => {
//       state.name += '1'
//     }, 1000)
//     return () => {
//       return h('div', { id: 'app' }, [
//         h('img', { alt: 'Vue logo', src: img }),
//         h('p', state.name)
//       ])
//     }
//   }
// })

// createApp(App).mount('#app')

import App from './App'
createApp(App).mount('#app')
