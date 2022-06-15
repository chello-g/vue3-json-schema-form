<template>
  <div class="hello">
    <h1>{{ age }}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
const PropType = {
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
  props: PropType,
  mounted() {
    this.age
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
