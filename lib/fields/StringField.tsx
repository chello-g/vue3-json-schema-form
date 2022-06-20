import { defineComponent } from 'vue'
import { FiledPropsDefine } from '../types'

export default defineComponent({
  name: 'StringFeild',
  props: FiledPropsDefine,
  setup(props) {
    const handleChange = (e: any) => {
      props.onChange(e.target.value)
    }

    return () => {
      const { value } = props
      return <input type="text" value={value as any} onInput={handleChange} />
    }
  }
})
