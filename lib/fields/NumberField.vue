<template>
  <input :value="value" type="number" @input="handleChange" />
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import { FiledPropsDefine } from '../types'

const props = defineProps(FiledPropsDefine)

const handleChange = (e: any) => {
  const value = e.target.value
  const num = Number(value)
  if (Number.isNaN(num)) {
    props.onChange(undefined)
  } else {
    props.onChange(num)
  }
}
</script>
