'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Staff extends Model {
    static associate(models) {
      // define association here
      Staff.hasMany(models.Punch)
    }
  }
  Staff.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Staff',
      tableName: 'Staffs'
    }
  )
  return Staff
}
