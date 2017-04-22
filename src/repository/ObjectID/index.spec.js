/* eslint-env jest */
const expect = require('expect')
const ObjectID = require('./index')

describe('Validate ObjectID', () => {
  const idValid = '58f7301e5da1cf088ee752be'
  const idInvalid = '12345'

  it('can return true', (done) => {
    expect(ObjectID(idValid)).toBeTruthy()
    done()
  })

  it('can return false', (done) => {
    expect(ObjectID(idInvalid)).toBeTruthy()
    done()
  })
})
