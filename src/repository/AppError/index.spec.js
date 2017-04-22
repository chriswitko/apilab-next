/* eslint-env jest */
const expect = require('expect')
const AppError = require('./index')

describe('Validate ObjectID', () => {
  it('can return error', (done) => {
    expect(AppError('Error')).toEqual({
      error: {
        message: 'Error',
        code: 500
      }
    })
    done()
  })
})
