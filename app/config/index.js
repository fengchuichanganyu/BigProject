const PERMISSION = require('./permission')
const { DB_CONN, DB_PREFIX } = require('./database')

// app 运行设置
const APP_HOST = {
  host: '0.0.0.0',
  port: 3000,
}
// 项目接口前缀
const API_PREFIX = '/api/v1/'
// 分页列表默认每页条数
const PAGE_SIZE = 10

// 数据库名称，用户名，密码
const DB_NAME = 'BigProject'
const DB_USERNAME = 'gyl'
const DB_PASSWORD = 'Gyl123456@'

module.exports = {
  DB_CONN,
  DB_PREFIX,
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  APP_HOST,
  API_PREFIX,
  PAGE_SIZE,
  PERMISSION,
}
