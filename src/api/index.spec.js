/* eslint-env mocha */
const request = require('supertest')
const server = require('../server/server')

describe('Index API', () => {
  let app = null
  let testResponse = {
    'hello': 'world'
  }

  let testRepo = {
    getIndex () {
      return Promise.resolve(testResponse)
    }
  }

  beforeEach(() => {
    return server.start({
      port: 3001, // changes from 3000, cause exception with active app
      repo: testRepo
    }).then(serv => {
      app = serv
    })
  })

  afterEach(() => {
    if (app) {
      app.close()
    }
    app = null
  })

  it('can return hello world', (done) => {
    request(app)
      .get('/')
      .expect((res) => {
        res.body.should.containEql({
          'hello': 'world'
        })
      })
      .expect(200, done)
  })

  it('can return test error', (done) => {
    request(app)
      .get('/test')
      .expect(500, done)
  })
})
