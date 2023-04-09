const { Pool, Client } = require('pg')
const connectionString = 'postgres://leha.@localhost/todoapp'
 

const client = new Client({
  connectionString,
})



module.exports = client;