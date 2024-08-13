const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');
const User = require('./User');  

const Post = sequelize.define('Post', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  indexes: [
    {
      fields: ['userId'],
    },
    {
      fields: ['title'],
    },
  ],
});

User.hasMany(Post, { as: 'posts' });
Post.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

module.exports = Post;