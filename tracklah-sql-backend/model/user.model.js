const {DataTypes, Model} =  require("sequelize");
const cc = require('currency-codes');

module.exports=  function (sequelize){
    class User extends Model{};

    User.init({
        username:{
            type:DataTypes.STRING,
            allowNull: false,
            validate:{
                is:/^[a-z0-9\.\-_']+$/
            }
        },

        hashedPassword:{
            type: DataTypes.STRING,
            allowNull:false,
        },

        name:{
            type:DataTypes.STRING(300),
            allowNull:false,
        },

        email:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                is: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i
            },
        },
        userId:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey: true,
        },

        defaultCurrency:{
            type: DataTypes.STRING,
            validate: {
                isIn: [cc.codes()],
            },
            allowNull:false,
        },

    }, {
        sequelize,
        modelName:'User',
        paranoid: true,
    })

    return User;

}