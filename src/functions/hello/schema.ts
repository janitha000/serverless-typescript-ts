export default {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        name: { type: 'string', maxLength: 2 },
        age: { type: 'number' },
        cities: {
          type: 'array',
          items: {
            type: 'number'
          },
          uniqueItems: true
        }

      },
      required: ['name', 'age', 'cities'],
    }
  }
}


// export default {
//   required: ['body'],
//   type: 'object',

//   properties: {
//     name: { type: 'string' },
//     age: { type: 'number' }

//   }


// }