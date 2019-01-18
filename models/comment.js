'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    commentTitle: {
      type: DataTypes.STRING,
      field: 'comment_title'
    },
    commentContent: {
      type: DataTypes.TEXT,
      field: 'comment_content'

    },
    commentcomment_voteote: {
      type: DataTypes.INTEGER,
      field: 'comment_vote'
    },
    userId: {
      type: DataTypes.INTEGER,
      field: 'user_id',
      onDelete: 'CASCADE',
      references: {
        model: 'user',
        key: 'id'
      }
    }
  }, {
    underscored: true,
    tableName: 'comment',
    timestamp: true
  });
  Comment.associate = function(models) {
    // associations can be defined here
    Comment.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    })
  };
  return Comment;
};