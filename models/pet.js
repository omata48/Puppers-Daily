module.exports = function(sequelize, DataTypes) {
    var Pet = sequelize.define('Pet', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Name cannot be null',
                },
            },
        },
        breed: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Breed cannot be null',
                },
            },
        },
        sex: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        vetRecords: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    });

    // Association
    Pet.associate = function(models) {
        Pet.belongsTo(models.User, {
            foreignKey:  {
                allowNull: false,
            },
        });
    };

    return Pet;
};