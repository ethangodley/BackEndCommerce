//imports 
const { Model, DataTypes } = require('sequelize'); // creates Model
const sequelize = require('../config/connection.js');


class Category extends Model {} // creates Category Model from base Model

// initializes category
Category.init( 
  {
    // define columns
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

module.exports = Category; // exports Category
