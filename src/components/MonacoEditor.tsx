/* eslint no-use-before-define: 0 */

import {
  defineComponent,
  ref,
  onMounted,
  watch,
  onBeforeUnmount,
  shallowReadonly,
  shallowRef
} from 'vue'

// The Monaco Editor is the code editor which powers VS Code
// The Monaco Editor API's Docs： https://microsoft.github.io/monaco-editor/api/modules/monaco.editor.html
import * as Monaco from 'monaco-editor' //  code Editor developed by microsoft

import type { PropType, Ref } from 'vue'
import { createUseStyles } from 'vue-jss'

const useStyles = createUseStyles({
  container: {
    border: '1px solid #eee',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 5
  },
  title: {
    backgroundColor: '#eee',
    padding: '10px 0',
    paddingLeft: 20
  },
  code: {
    flexGrow: 1
  }
})

export default defineComponent({
  props: {
    code: {
      type: String as PropType<string>, // ts的string
      required: true
    },
    onChange: {
      type: Function as PropType<
        (value: string, event: Monaco.editor.IModelContentChangedEvent) => void
      >,
      required: true
    },
    title: {
      type: String as PropType<string>,
      required: true
    }
  },
  setup(props) {
    // must be shallowRef, if not, editor.getValue() won't work
    // shallowRef：只处理基本数据类型的响应式, 不进行对象的响应式处理。
    const editorRef = shallowRef()

    const containerRef = ref()

    let _subscription: Monaco.IDisposable | undefined
    let __prevent_trigger_change_event = false

    onMounted(() => {
      // create(domElement: HTMLElement, options?: IStandaloneEditorConstructionOptions, override?: IEditorOverrideServices): IStandaloneCodeEditor
      const editor = (editorRef.value = Monaco.editor.create(
        containerRef.value,
        {
          value: props.code,
          language: 'json',
          formatOnPaste: true,
          tabSize: 2,
          minimap: {
            enabled: false
          }
        }
      ))

      //   监听内容被修改：onDidChangeModelContent
      _subscription = editor.onDidChangeModelContent((event) => {
        if (!__prevent_trigger_change_event) {
          props.onChange(editor.getValue(), event)
        }
      })
    })

    onBeforeUnmount(() => {
      if (_subscription) _subscription.dispose()
    })

    watch(
      // listen props.code changes
      () => props.code,
      (v) => {
        const editor = editorRef.value
        const model = editor.getModel() // Get the model that has uri if it exists.
        console.log('model---------->', model)
        if (v !== model.getValue()) {
          editor.pushUndoStop() // ?
          __prevent_trigger_change_event = true
          // pushEditOperations says it expects a cursorComputer, but doesn't seem to need one.
          model.pushEditOperations(
            // ?
            [],
            [
              {
                range: model.getFullModelRange(),
                text: v
              }
            ]
          )
          editor.pushUndoStop()
          __prevent_trigger_change_event = false
        }
        // if (v !== editorRef.value.getValue()) {
        //   editorRef.value.setValue(v)
        // }
      }
    )

    const classesRef = useStyles()

    return () => {
      const classes = classesRef.value

      return (
        <div class={classes.container}>
          <div class={classes.title}>
            <span>{props.title}</span>
          </div>
          <div class={classes.code} ref={containerRef}></div>
        </div>
      )
    }
  }
})
