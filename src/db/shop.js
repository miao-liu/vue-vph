import dbConfig from '../config/db'
const mysql = require('mysql')
const connection = mysql.createConnection({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  multipleStatements: true,
  typeCast: function (field, next) {
    if (field.type === 'TINY' && field.length === 1) {
      return (field.string() === '1')
    } else {
      return next()
    }
  }
})

connection.connect(err => {
  console.log(err)
})

function query ({ fields, conditions, tabName }, cb) {
  let sql = `SELECT ${fields} FROM ${tabName}`
  sql = conditions ? sql + ' ' + conditions : sql
  console.log(sql)
  connection.query(sql, function (error, results, fields) {
    cb(error, results)
  })
}

export default {
  getHotTypes (cb) {
    query({ fields: '*', conditions: '', tabName: dbConfig.level_3 }, cb)
  }
}
