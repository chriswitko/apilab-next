/* eslint-env mocha */
const {EventEmitter} = require('events')
const test = require('assert')
const mongo = require('./mongo')
const {dbSettings} = require('./config')

describe('Mongo Connection', () => {
  it('should emit db Object with an EventEmitter', (done) => {
    const mediator = new EventEmitter()

    mediator.on('db.ready', (db) => {
      db.admin().listDatabases((err, dbs) => {
        test.equal(null, err)
        test.ok(dbs.databases.length > 0)
        db.close()
        done()
      })
    })

    mediator.on('db.error', (err) => {
      test.notEqual(null, err)
      // console.log(err)
      done()
    })

    mongo.connect(dbSettings, mediator)

    mediator.emit('boot.ready')
  })

  it('should emit db Err with an EventEmitter', (done) => {
    const mediator = new EventEmitter()

    mediator.on('db.error', (err) => {
      test.notEqual(null, err)
      // console.log(err)
      done()
    })

    mongo.connect({
      db: '',
      dbParameters: () => {},
      servers: [
        'localhost:27018'
      ],
      serverParameters: () => {},
      replsetParameters: () => {}
    }, mediator)

    mediator.emit('boot.ready')
  })
})
