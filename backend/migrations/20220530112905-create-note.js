'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('notes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        references: { model: 'users', key: 'email' }
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then(async () => await queryInterface.addConstraint('notes', {
      fields: ['email', 'date'],
      type: 'unique',
      name: 'unique_constraint'
    }));
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('notes');
  }
};