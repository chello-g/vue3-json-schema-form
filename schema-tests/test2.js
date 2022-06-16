// json-schema中的format https://ajv.js.org/guide/formats.html
// json-schema中的format与自定义format
const Ajv = require('ajv')
const addFormats = require('ajv-formats') // 使用json-schema自带的format，需要安装ajv-formats并引入

const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      //   format:'email' // json-schema自带email的format
      format: 'test' // 自定义format：test
      // minLength: 10,
    },
    age: {
      type: 'number'
    },
    pets: {
      type: 'array',
      items: [
        {
          type: 'string'
        },
        {
          type: 'number'
        }
      ]
    },
    isWorker: {
      type: 'boolean'
    }
  },
  required: ['name', 'age']
}

const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}
addFormats(ajv)
// 自定义format
ajv.addFormat('test', (data) => {
  console.log(data, '------------')
  return data === 'haha'
})
const validate = ajv.compile(schema)
const valid = validate({
  name: 'aaa',
  age: 18,
  pets: ['mimi', 12],
  isWorker: true
})
if (!valid) console.log(validate.errors)
