<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
</template>

<script lang="ts">
// defineComponent 等api的定义可以在vue3源码https://github.com/vuejs/core中进行查看
// defineComponent 定义在packages/runtime-core/src
import { defineComponent, PropType } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
interface Config {
  name: string
}
// 从实现上看，defineComponent(定义组件) 只返回传递给它的对象。但是，就类型而言，返回的值有一个合成类型的构造函数，用于手动渲染函数、TSX 和 IDE 工具支持。
export default defineComponent({
  name: 'App',
  props: {
    age: {
      type: Number as PropType<number> // Number是js中的，PropType<number>是ts的类型
    },
    config: {
      type: Object as PropType<Config>,
      required: true
    }
  },
  components: {
    HelloWorld
  },
  mounted() {
    // this.config
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
