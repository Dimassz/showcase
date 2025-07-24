const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Catalog = sequelize.define('catalog', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
    price: {
      type: DataTypes.INTEGER,
    },
    details: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    size: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    picture: {
      type: DataTypes.JSON,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    published: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
    category: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    sale: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    timestamps: false, 
    tableName: 'catalog',
  });

  return Catalog;
};
