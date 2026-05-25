'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Productos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      precio: {
        type: Sequelize.FLOAT
      },
      stock: {
        type: Sequelize.INTEGER
      },
      categoriaId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Categoria', // Nombre exacto de la tabla de categorías
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL' // O CASCADE, según la lógica de negocio
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Productos');
  }
};