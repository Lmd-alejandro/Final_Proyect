module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define("Order", {
    id: {
        type: DataTypes.BIGINT(20),
        primaryKey: true,
        autoIncrement: true,
    },
    clientId: {
        type: DataTypes.BIGINT(20),
        allowNull: false,
    },
    },
    {
    tableName: "orders",
    timestamps: false,
    });


};
    return Order;