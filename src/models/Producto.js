module.exports = (sequelize, DataTypes) => {
    const product = sequelize.define("product", {
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
        tableName: "products",
        timestamps: false,
    });

    return product;
};
