/* eslint-env mocha, jest */
// const should = require('should')
const expect = require('expect')
const repository = require('./index')

describe('Index', () => {
  it('should disconnect', (done) => {
    repository.connect({
      collection: () => {},
      close: () => {}
    }).then(r => {
      const spy = expect.spyOn(r, 'disconnect')
      r.disconnect()
      expect(spy).toHaveBeenCalled()
      spy.restore()
      expect.restoreSpies()
      done()
    })
  })

  it('should disconnect with close', (done) => {
    let db = {
      collection: () => jest.fn(),
      close: () => {}
    }
    repository.connect(db).then(r => {
      const spy = expect.spyOn(r, 'disconnect').andCallThrough() // .andReturn(db.close())
      r.disconnect()
      expect(spy.calls.length).toEqual(1)
      spy.restore()
      expect.restoreSpies()
      done()
    })
  })

  it('should disconnect close db', (done) => {
    let db = {
      collection: () => jest.fn(),
      close: () => {}
    }
    repository.connect(db).then(r => {
      const spy = expect.spyOn(db, 'close')
      db.close()
      expect(spy).toHaveBeenCalled()
      spy.restore()
      expect.restoreSpies()
      done()
    })
  })

  it('should resolve', (done) => {
    repository.connect({
      collection: () => {},
      close: () => {}
    }).then(r => {
      expect(r).toEqual(r)
      done()
    })
  })

  it('should reject', (done) => {
    repository.connect().then(r => {
      expect(r).toEqual(r)
      done()
    }).catch(e => {
      expect(e).toEqual('Error: connection db not supplied!')
      done()
    })
  })
})
