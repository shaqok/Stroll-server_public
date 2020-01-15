const crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'Users',
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nickname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pet: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      hooks: {
        afterValidate: (data) => {
          const key = crypto.pbkdf2Sync(
            data.password,
            data.email,
            100000,
            64,
            'sha512',
          );
          // eslint-disable-next-line no-param-reassign
          data.password = key.toString('hex');
        },
      },
    },
  );
  // eslint-disable-next-line func-names
  Users.associate = function (models) {
    // associations can be defined here
    Users.hasMany(models.Reviews);
    Users.hasMany(models.Trails);
  };
  return Users;
};
