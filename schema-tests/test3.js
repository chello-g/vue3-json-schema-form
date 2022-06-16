// 自定义关键字：官网介绍有4种方法
// 1. validation function
// 2. compilation function
// 3. macro function
// 4. inline compilation function（性能好，但是难读）
const Ajv = require('ajv')

const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      test: false
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
ajv.addKeyword('test', {
  //   1.
  //   validate(schema, data) {
  //     console.log(schema, data)
  //     if (schema === true) return true
  //     else return schema.length === 6
  //   }
  //   2.
  //   compile(schema, parentSchema) {
  //     console.log(schema, parentSchema)
  //     return () => true // return一个函数
  //   }
  //   3.
  //   macro() {
  //     // 给test的schema加上以下定义的校验
  //     return {
  //       // return一个schema
  //       minLength: 2
  //     }
  //   }
  //   xxx.
  //   metaSchema: {
  //     // 对接收到的schema的校验，如接收到test: false，那这个校验就能通过
  //     type: 'boolean'
  //   }
})
const validate = ajv.compile(schema)
const valid = validate({
  name: 'haha',
  age: 18,
  pets: ['mimi', 12],
  isWorker: true
})
if (!valid) console.log(validate.errors)
