const { User } = require( "../model/model" );
require('dotenv').config()

module.exports = {

    register: async (newUserDetails) => {

        let result = {
            message: null,
            status: null,
            data: null,
        }

        // Check if user is already registered in the system under email address.
        const user = await User.findOne({ userId: newUserDetails.userId });
        if ( user != null ){
            result.message = `User ID ${newUserDetails.userId} already in use`;
            result.status = 404;
            return result;
        }

        const newUser = await User.create(
            {
                userId: newUserDetails.userId,
                items: []
            }
        );

        result.data = newUser;
        result.status = 200;
        result.message = `New Account Registered Successfully.`;
        return result;
    },

    deleteUser: async (userId) => {

        let result = {
            message: null,
            status: null,
            data: null
        }

        // Check if user is already registered in the system.

        console.log("UserId", userId);
        const deleteUser = await User.deleteOne({userId: userId});

        console.log("deleteUser",deleteUser);

        if (deleteUser.deletedCount < 1){
            result.message = `User does not exist.`;
            result.status = 404;
            return result;
        }

        result.status = 200;
        result.message = `User ID ${userId} deleted successfully`;
        return result;
    }

};