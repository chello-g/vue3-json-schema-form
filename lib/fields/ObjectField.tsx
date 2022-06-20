import { defineComponent } from 'vue'

import { FiledPropsDefine } from '../types'
import { isObject } from '../utils'
import { useVJSFContext } from '../context' // 用于provide，inject

const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    age: {
      type: 'number'
    }
  }
}

export default defineComponent({
  name: 'ObjectField',
  props: FiledPropsDefine,
  setup(props) {
    const context = useVJSFContext() // SchemaItem

    const handleObjectFieldChange = (key: string, v: any) => {
      const value: any = isObject(props.value) ? props.value : {}

      if (v === undefined) {
        delete value[key]
      } else {
        value[key] = v
      }

      props.onChange(value)
    }

    return () => {
      const { schema, rootSchema, value } = props

      console.log('ObjectField.tsx---schema<*****************>', schema)
      console.log('ObjectField.tsx---rootSchema<*****************>', rootSchema)
      console.log('ObjectField.tsx---value<*****************>', value)

      const { SchemaItem } = context

      const properties: any = schema.properties || {}

      const currentValue: any = isObject(value) ? value : {}

      return Object.keys(properties).map((k: string, index: number) => (
        <SchemaItem
          schema={properties[k]}
          rootSchema={rootSchema}
          value={currentValue[k]}
          key={index}
          onChange={(v: any) => handleObjectFieldChange(k, v)}
        />
      ))
    }
  }
})
