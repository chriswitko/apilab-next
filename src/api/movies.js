'use strict'

const ResponseInterceptor = require('./ResponseInterceptor')

module.exports = (app, options) => {
  const {repo} = options

  app.get('/movies', (req, res, next) => {
    const {page, limit} = req.query
    repo.movies.getAllMovies({page, limit}).then(movies => {
      ResponseInterceptor(movies, res)
    }).catch(next)
  })

  app.get('/movies/premieres', (req, res, next) => {
    repo.movies.getMoviePremiers().then(movies => {
      ResponseInterceptor(movies, res)
    }).catch(next)
  })

  app.get('/movies/:id', (req, res, next) => {
    repo.movies.getMovieById(req.params.id).then(movie => {
      ResponseInterceptor(movie, res)
    }).catch(next)
  })
}
