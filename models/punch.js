'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Punch extends Model {
    static associate(models) {
      // define association here
      Punch.belongsTo(models.Staff)
    }
  }
  Punch.init(
    {
      punchIn_time: DataTypes.DATE,
      punchOut_time: DataTypes.DATE
    },
    {
      sequelize,
      modelName: 'Punch'
    }
  )
  return Punch
}
