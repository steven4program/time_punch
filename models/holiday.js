'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Holiday extends Model {
    static associate(models) {
      // define association here
    }
  }
  Holiday.init(
    {
      date: DataTypes.STRING,
      isHoliday: DataTypes.BOOLEAN
    },
    {
      sequelize,
      modelName: 'Holiday',
      tableName: 'Holidays'
    }
  )
  return Holiday
}
