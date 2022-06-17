<!-- 使用SFC的setup语法开发StringField组件 -->
<template>
  <input type="text" :value="value" @input="handleChange" />
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import { FiledPropsDefine } from '../types'

const props = defineProps(FiledPropsDefine)

const handleChange = (e: any) => {
  console.log('StringField-handleChange-e', e)
  props.onChange(e.target.value)
}
</script>
