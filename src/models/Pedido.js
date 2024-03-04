module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define("Order", {
    id: {
        type: DataTypes.BIGINT(20),
        primaryKey: true,
        autoIncrement: true,
    },
    CustomerId: {
        type: DataTypes.BIGINT(20),
        allowNull: false,
    },
    },
    {
    tableName: "orders",
    timestamps: false,
    });

    Order.associate = function (models) {
    };

    return Order;
};
