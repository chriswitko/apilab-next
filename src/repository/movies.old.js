/* eslint-env jest */
const should = require('should')
const expect = require('expect')
const movies = require('./index')

describe('Repository', () => {
  let repo = null

  beforeEach(() => {
    repo = Promise.resolve(movies.connect({
      collection: () => ({
        find: () => [],
        findOne: () => {}
      })
    }))
  })

  afterEach(() => {
    repo = null
  })

  it('should return an error by wrong id', done => {
    repo.then(r => {
      r.movies.getMovieById('x').should.be.a.Promise()
      done()
    })
  })

  it('should return an one empty movie', (done) => {
    repo.then(r => {
      r.movies.getMovieById().then(m => {
        expect(m).toEqual([])
        done()
      }).catch(e => {
        expect(e).toEqual({
          error: {
            message: 'An error occured fetching a movie with id: undefined, err: No id',
            code: 500
          }
        })
        done()
      })
    })
  })

  // it('should interate the array of movies', done => {
  //   repo.then(r => {
  //     r.movies.getMoviePremiers().should.be.a.Promise()
  //     done()
  //   })
  // })

  it('should return an empty array', (done) => {
    repo.then(r => {
      r.movies.getMoviePremiers().then(m => {
        expect(m).toEqual([])
        done()
      }).catch(e => {
        expect(e).toEqual({
          error: {
            message: 'An error occured fetching all movies, err:Missing movies',
            code: 500
          }
        })
        done()
      })
    })
  })

  it('should return an one-element array', (done) => {
    Promise.resolve(movies.connect({
      collection: () => ({
        find: () => ['element1'],
        findOne: () => {}
      })
    })).then(r => {
      r.movies.getMoviePremiers().should.be.a.Promise(['element1'])
      done()
    })
  })

  it('should return an empty array from getAllMovies', (done) => {
    Promise.resolve(movies.connect({
      collection: () => ({
        find: () => ({
          skip: () => []
        })
      })
    })).then(r => {
      r.movies.getAllMovies({page: 1, limit: 10}).should.containEql([])
      done()
    })
  })

  it('should return an one-element array from getAllMovies', (done) => {
    Promise.resolve(movies.connect({
      collection: () => ({
        find: () => ({skip: () => ['element1']})
      })
    })).then(r => {
      r.movies.getAllMovies({page: 1, limit: 10}).should.be.a.Promise(['element1'])
      done()
    })
  })

  // it('should connect with a promise', (done) => {
  //   repository.connect({
  //     collection: () => {}
  //   }).should.be.a.Promise()
  //   done()
  // })
})
