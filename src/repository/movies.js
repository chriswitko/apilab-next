'use strict'
const ObjectID = require('./ObjectID')
const AppError = require('./AppError')

const repository = (db) => {
  const collection = db.collection('movies')

  const getAllMovies = ({page = 1, limit = 10}) => {
    return new Promise((resolve, reject) => {
      const movies = []
      const cursor = collection.find({}, {title: 1, id: 1}).skip((page - 1) * 10, limit)
      const addMovie = (movie) => {
        movies.push(movie)
      }
      const sendMovies = (err) => {
        if (err) {
          resolve(AppError('An error occured fetching all movies, err:' + err))
        }
        resolve(movies.slice())
      }
      if (cursor.length) {
        cursor.forEach(addMovie, sendMovies)
      } else {
        sendMovies('Missing movies')
      }
    })
  }

  const getMoviePremiers = () => {
    return new Promise((resolve, reject) => {
      const movies = []
      const currentDay = new Date()
      const query = {
        releaseYear: {
          $gt: currentDay.getFullYear() - 1,
          $lte: currentDay.getFullYear()
        },
        releaseMonth: {
          $gte: currentDay.getMonth() + 1,
          $lte: currentDay.getMonth() + 2
        },
        releaseDay: {
          $lte: currentDay.getDate()
        }
      }
      const cursor = collection.find(query)
      const addMovie = (movie) => {
        movies.push(movie)
      }
      const sendMovies = (err) => {
        if (err) {
          reject(AppError('An error occured fetching all movies, err:' + err)) // AppError('An error occured fetching all movies, err:' + err)
        }
        resolve(movies)
      }
      if (cursor.length) {
        cursor.forEach(addMovie, sendMovies)
      } else {
        sendMovies('Missing movies')
      }
    })
  }

  const getMovieById = id => {
    return new Promise((resolve, reject) => {
      const projection = { _id: 0, id: 1, title: 1, format: 1 }
      const sendMovie = (err, movie) => {
        if (err || !movie) {
          reject(AppError(`An error occured fetching a movie with id: ${id}, err: ${err}`))
        }
        resolve(movie)
      }
      if (!id) {
        sendMovie('No id')
      } else {
        collection.findOne({_id: ObjectID(id)}, projection, sendMovie)
      }
    })
  }

  return Object.create({
    getAllMovies,
    getMoviePremiers,
    getMovieById
  })
}

const connect = (connection) => {
  return new Promise((resolve, reject) => {
    if (!connection) {
      reject(new Error('connection db not supplied!'))
    }
    resolve(repository(connection))
  })
}

module.exports = Object.assign({}, {connect})
