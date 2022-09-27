
// imports
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

// creates Tag model from base Model
class Tag extends Model {}

// initialises Tag model from Model
Tag.init(
  {
    tag_name: {
      type: DataTypes.STRING,
    }
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'tag',
  }
);

module.exports = Tag; // exports Tag model
