'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('credentials', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      platform: {
        type: Sequelize.STRING
      },
      username:{
        type:Sequelize.STRING,
        allowNull:false,
      },
      email: {
        type: Sequelize.STRING,
        references: { model: 'users', key: 'email' }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then(async () => await queryInterface.addConstraint('credentials', {
      fields: ['platform', 'email'],
      type: 'unique',
      name: 'unique_constraint_two'
    }));
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('credentials');
  }
};