'use strict'
const ObjectID = require('mongodb').ObjectID

const IdInterceptor = id => {
  const checkForHexRegExp = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i
  if (checkForHexRegExp.test(id)) {
    return ObjectID(id)
  } else {
    return new Error('Wrong Id')
  }
}

module.exports = IdInterceptor
