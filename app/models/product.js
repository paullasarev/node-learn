module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: {
    type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.NUMBER,
      allowNull: true,
    },
  });
  return Product;
};