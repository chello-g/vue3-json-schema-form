<template>
  <div class="hello">
    <h1 class="ageclass">{{ age }}</h1>
    <p>{{ colorRef }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue'
const PropsType = {
  age: {
    type: Number,
    required: true
  }
} as const // 添加as const的原因是：如果不写as const 在mounted写this.age,鼠标覆盖显示(property) age?: number | undefined ,里面还是有| undefined ，说明age中的required: true没有值作用。添加as const可以解决
// 会产生这个现象的主要原因是vue源码的defineComponent定义处为PropsOptions extends Readonly<ComponentPropsOptions>,props是个只读属性，且有注释
// the Readonly constraint allows TS to treat the type of { required: true } as constant instead of boolean.
// Readonly约束允许TS将{required: true}的类型作为常量，而不是布尔值。

export default defineComponent({
  name: 'HelloWorld',
  props: PropsType,
  mounted() {
    // this.age
  },
  data() {
    return {
      color: '#088dff'
    }
  },
  setup(props, context) {
    // setup第一个参数是props,是响应式的,不能使用es6解构,否则消除prop的响应式
    // setup中第二个参数是一个普通JS对象,暴露了其他可能在setup中有用的值,它是一个普通的JS对象,不是响应式的。可以使用es6解构
    console.log(props, context)
    const nameRef = ref('myname')
    // setInterval(() => {
    //   nameRef.value += '2'
    // }, 500)
    watchEffect(() => {
      // 所依赖的值变化后就会执行。在这里，依赖nameRef.value，所以当nameRef.value变化的时候，就会打印
      // 感觉有点像vue2中的computed
      console.log(nameRef.value)
    })
    const colorRef = ref('#ccc')
    setInterval(() => {
      colorRef.value = '#088dff'
    }, 3000)
    return {
      colorRef
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ageclass {
  /* vue3新增：单文件组件状态驱动的 CSS 变量 (<style> 中的 v-bind) */
  /* color: v-bind(color); */
  color: v-bind(colorRef);
}
</style>
