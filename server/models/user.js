'use strict';
const {
  Model
} = require('sequelize');
const hashPass = require('../helpers/bcrypt').hashPass
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Task, {foreignKey: 'UserId'})
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'invalid email format'
        }
      }
    },
    password: DataTypes.STRING,
    organization: DataTypes.STRING
  }, { hooks: {
    beforeCreate: (user, opt) => {
      user.password = hashPass(user.password)
      user.organization = `Hacktiv8`
    }
  },
    sequelize,
    modelName: 'User',
  });
  return User;
};