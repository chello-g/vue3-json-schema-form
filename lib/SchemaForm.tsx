import { defineComponent, PropType, provide, reactive } from 'vue'

import { Schema, FiledPropsDefine } from './types'

import SchemaItem from './SchemaItem'

import { SchemaFormContextKey } from './context'

type A = typeof SchemaItem

export default defineComponent({
  name: 'SchemaForm',
  props: {
    schema: {
      type: Object as PropType<Schema>,
      required: true
    },
    value: {
      required: true
    },
    onChange: {
      type: Function as PropType<(v: any) => void>,
      required: true
    }
  },
  setup(props, { slots, emit, attrs }) {
    const handleChange = (v: any) => {
      console.log('handleCahneg', v)
      props.onChange(v) // 触发App.tsx中<SchemaForm schema={demo.schema} onChange={handleChange} value={demo.data}/>的onChange方法
    }

    const context: any = {
      SchemaItem
    }

    provide(SchemaFormContextKey, context)

    return () => {
      const { schema, value } = props
      return (
        <SchemaItem
          schema={schema}
          rootSchema={schema}
          value={value}
          onChange={handleChange}
        />
      )
    }
  }
})
