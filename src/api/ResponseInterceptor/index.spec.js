/* eslint-env jest */
const expect = require('expect')
const ResponseInterceptor = require('./index')

describe('ResponseInterceptor API', () => {
  const data = {
    hello: 'World'
  }

  it('can return response', (done) => {
    let res = {
      status: () => {
        return {
          json: (d) => {
            return d
          }
        }
      }
    }
    expect(ResponseInterceptor(data, res)).toEqual({
      hello: 'World'
    })
    done()
  })

  it('can return error', (done) => {
    let res = {
      status: () => {
        return {
          json: (d) => {
            return d
          }
        }
      }
    }
    expect(ResponseInterceptor(null, res)).toEqual({
      error: {
        message: 'No content',
        code: 400
      }
    })
    done()
  })
})
