const DB_CONN = {
  host: '47.96.156.243', // MySQL 服务器主机名
  dialect: 'mysql', // 使用 MySQL 数据库
  username: 'gyl', // 您的 MySQL 用户名
  password: 'Gyl123456@', // 您的 MySQL 密码
  database: 'bigproject', // 您的 MySQL 数据库名称
  port: 3306, // MySQL 服务器端口号（默认是3306）
  pool: {
    max: 5, // 连接池中的最大连接数
    min: 0, // 连接池中的最小连接数
    acquire: 30000, // 获取连接的超时时间（毫秒）
    idle: 10000, // 连接在闲置状态下被释放的时间（毫秒）
  },
  query: { raw: true },
  logging: function (sql) {
    // console.log(sql)
  },
}

// 数据库表名前缀设置
const DB_PREFIX = 'fungleo_'

// app 运行设置
const APP_HOST = {
  host: '0.0.0.0',
  port: 3000,
}
// 项目接口前缀
const API_PREFIX = '/api/v1/'

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
}
