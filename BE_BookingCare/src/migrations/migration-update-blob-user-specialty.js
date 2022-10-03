module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Users', 'image', {
        type: Sequelize.BLOB('long'),
        allowNull: true,
      }),
      queryInterface.changeColumn('Specialties', 'image', {
        type: Sequelize.BLOB('long'),
        allowNull: true,
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Users', 'image', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.changeColumn('Specialties', 'image', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
    ]);
  },
};
