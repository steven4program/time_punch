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
      staffId: DataTypes.INTEGER,
      date: DataTypes.DATEONLY,
      hours: DataTypes.INTEGER,
      punchInTime: DataTypes.STRING,
      punchOutTime: DataTypes.STRING,
      attendance: DataTypes.BOOLEAN
    },
    {
      sequelize,
      modelName: 'Punch',
      tableName: 'Punches'
    }
  )
  return Punch
}
