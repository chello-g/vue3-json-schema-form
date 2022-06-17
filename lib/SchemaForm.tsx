import { defineComponent, PropType } from 'vue'

import { Schema, FiledPropsDefine } from './types'

import SchemaItem from './SchemaItem'

export default defineComponent({
  name: 'SchemaForm',
  props: FiledPropsDefine,
  setup(props, { slots, emit, attrs }) {
    const handleChange = (v: any) => {
      console.log('handleCahneg', v)
      props.onChange(v)
    }

    return () => {
      const { schema, value } = props
      return (
        <SchemaItem schema={schema} value={value} onChange={handleChange} />
      )
    }
  }
})
