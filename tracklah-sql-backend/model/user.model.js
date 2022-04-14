const {DataTypes, Model} =  require("sequelize");

module.exports=  function (sequelize){
    class User extends Model{};

    User.init({
        username:{
            type:DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            validate:{
                is:/^[a-z0-9\.\-_']+$/
            }
        },

        hashedPassword:{
            type: DataTypes.STRING.BINARY,
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
            unique:true,
        }
    }, {
        sequelize,
        modelName:'User',
        paranoid: true,
    })

    return User;

}