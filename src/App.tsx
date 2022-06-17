// 对比App.vue（vue自带的sfc写法）和App.tsx（jsx写法）的区别，两者实现的功能是一样的
import { createApp, defineComponent, h, reactive } from 'vue'
const img = require('./assets/logo.png') // eslint-disable-line
// import HelloWorld from './components/HelloWorld.vue'
import HelloWorld from './components/HelloWorld' // HelloWorld.tsx

function renderHelloWorld(num: number) {
  return <HelloWorld age={num} />
}

export default defineComponent({
  // setup中没有this
  setup() {
    // 这是一个闭包，setup中的东西只在开始的时候渲染一次，state的初始值一直是aaa
    const state = reactive({
      name: 'aaa'
    })
    // setInterval(() => {
    //   state.name += '2'
    // }, 1000)
    return () => {
      // vue中h函数的写法
      //   return h('div', { id: 'app' }, [
      //     h('img', { alt: 'Vue logo', src: img }),
      //     h('p', state.name)
      //   ])

      // 添加了可编译jsx写法的插件vue/babel-plugin-jsx之后jsx的写法
      return (
        <div id="app">
          <img alt="Vue logo" src={img} />
          <p>{state.name}</p>
          {/* age在props中写了required:true，在这里如果不写age传参在编译的时候会提示，但是sfc写法，写在模板里，在编译的时候就不会报错 */}
          {/* 在编译的时候可以识别错误，但是vscode编辑器却不能识别，主要是ts不能很好支持vue语法，vue文件导出类型可以在shims-vue.d.ts中定义.所以最好使用tsx文件代替vue文件 */}
          {/* <HelloWorld  /> */}
          {renderHelloWorld(12)}
        </div>
      )
    }
  }
})
