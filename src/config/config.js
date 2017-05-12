// TODO: Add env versions dev, beta, prod
const dbSettings = {
  db: process.env.DB || 'movies',
  user: process.env.DB_USER || '',
  pass: process.env.DB_PASS || '',
  repl: process.env.DB_REPLS || 'rs1',
  servers: (process.env.DB_SERVERS) ? process.env.DB_SERVERS.split(' ') : [
    'localhost:27017'
  ]
}

const serverSettings = {
  static: false,
  port: process.env.PORT || 3000,
  ssl: require('./ssl')
}

module.exports = Object.assign({}, { dbSettings, serverSettings })
