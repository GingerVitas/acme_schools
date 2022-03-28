const Sequelize = require('sequelize');
const db = require('./db');

const Campus = db.define('campus', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'https://media.istockphoto.com/photos/generic-university-campus-picture-id172638870?k=20&m=172638870&s=170667a&w=0&h=gRk4BPsANpFvIuZuPpc0VcGnK06oBaKC5EUB26yOZj0=',
    validate: {
      isUrl: true
    }
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT
  }
})

module.exports = Campus