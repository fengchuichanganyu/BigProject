const Sequelize = require('sequelize')
const { DB_CONN, DB_PREFIX } = require(':config')
const models = require('./models')
const sequelize = new Sequelize(DB_CONN)
Object.keys(models).forEach((item) => {
  // console.log(models)
  sequelize.define(item, models[item], {
    freezeTableName: true,
    tableName: (DB_PREFIX + item).toLowerCase(),

    timestamps: false,
  })
})
console.log(sequelize)
sequelize.sync()
console.log('[INFO] model init success')

module.exports = sequelize
