const Sequelize = require('sequelize')
const { DB_CONN, DB_PREFIX } = require('../config')
const models = require('./models')
const sequelize = new Sequelize(DB_CONN)
const model = {}
Object.keys(models).forEach((item) => {
  // console.log(models)
  const tempModel = sequelize.define(item, models[item], {
    freezeTableName: true,
    tableName: (DB_PREFIX + item).toLowerCase(),

    timestamps: false,
  })
  //   console.log(model)
  //   console.log(tempModel)
  model[item] = tempModel
})
sequelize.sync()
console.log('[INFO] model init success')

module.exports = model
