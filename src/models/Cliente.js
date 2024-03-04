module.exports = (sequelize, DataTypes) => {
    const Client = sequelize.define("Client", {
    id: {
        type: DataTypes.BIGINT(20),
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    },
    {
    tableName: "clients",
    timestamps: false,
    });

    Client.associate = function (models) {
    };

    return Client;
};
