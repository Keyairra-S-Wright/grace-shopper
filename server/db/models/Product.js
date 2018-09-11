const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  title: {
    type: Sequelize.STRING,
    isNull: false,
    validate: {
      notEmpty: true
    }
  },
  imgUrl: {
    type: Sequelize.STRING,
    defaultValue: 'marcy.jpg'
  },
  price: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT
  },
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      notEmpty: true
    }
  },
  category: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Product
