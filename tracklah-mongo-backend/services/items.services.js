const { User } = require( "../model/model" );
require('dotenv').config()
const moment = require('moment');

module.exports = {

    addItem: async (userId, item) => {

        let result = {
            message: null,
            status: null,
            data: null,
        }

        // Check if userId exists.
        const user = await User.findOne({ userId: userId });
        if ( user === null ){
            result.message = `User ID ${userId} does not exist`;
            result.status = 404;
            return result;
        }

        // If userId exists, we add the item to the end of the items array.
        user.items.push(item);
        const updateUser = await user.save();

        result.data = updateUser;
        result.status = 200;
        result.message = `Item added to userId ${userId} document.`;
        return result;
    },

    deleteItem: async (userId, itemId) => {

        let result = {
            message: null,
            status: null,
            data: null
        }

        // Check if userId exists.
        const user = await User.findOne({ userId: userId });
        if ( user === null ){
            result.message = `User ID ${userId} does not exist`;
            result.status = 404;
            return result;
        }

        // Locate the index of the relevant item to delete, and then delete it.
        const index = user.items.findIndex( e => e._id == itemId);
        // using a double == sign because the _id is a different type of object.

        user.items.splice(index,1);
        const updateUser = await user.save();

        result.data = updateUser;
        result.status = 200;
        result.message = `Item ID ${itemId} deleted successfully`;
        return result;
    },

    showAllItems: async (userId) => {

        let result = {
            message: null,
            status: null,
            data: null
        }

        // Check if userId exists.
        const user = await User.findOne({ userId: userId });
        if ( user === null ){
            result.message = `User ID ${userId} does not exist`;
            result.status = 404;
            return result;
        }

        const today = moment();
        const currentMth = today.month();
        const currentYear = today.year();
        let data;

        console.log("today", today);
        console.log("CurrentMth", currentMth);
        console.log("CurrentYear", currentYear);

        const allItemData = user.items;

        switch(currentMth){
            case 0:
            case 1:
            case 2:
                data = allItemData.filter( (e) => {
                    let itemMth = moment(e.date,"MMM Do YYYY").month();
                    let itemYear = moment(e.date,"MMM Do YYYY").year();

                    console.log("ItemMth", itemMth);
                    console.log("ItemYear", itemMth);
                    
                    if (itemYear === currentYear && itemMth <= currentMth){
                        return true;
                    } else if (itemYear === currentYear-1 && itemMth > currentMth+11-3) {
                        return true;
                    } else {
                        return false;
                    }
                });
                break;

            default:
                data = allItemData.filter( (e) => {
                    let itemMth = moment(e.date,"MMM Do YYYY").month();
                    let itemYear = moment(e.date,"MMM Do YYYY").year();

                    console.log("ItemMth", itemMth);
                    console.log("ItemYear", itemMth);
                    
                    if(itemYear === currentYear && itemMth >= currentMth-3){
                        return true;
                    } else {
                        return false;
                    }
                });
                break;
        }

        console.log("Data", data);

        result.data = data;
        result.message = "Data fetched successfully from database.";
        result.status = 200;   

        return result;
    },

    showCurrentMonthItems: async (userId) => {

        let result = {
            message: null,
            status: null,
            data: null
        }

        // Check if userId exists.
        const user = await User.findOne({ userId: userId });
        if ( user === null ){
            result.message = `User ID ${userId} does not exist`;
            result.status = 404;
            return result;
        }

        const today = moment();
        const currentMth = today.month();
        const currentYear = today.year();
        let data;

        console.log("today", today);
        console.log("CurrentMth", currentMth);
        console.log("CurrentYear", currentYear);

        const allItemData = user.items;

        data = allItemData.filter( (e) => {
            let itemMth = moment(e.date,"MMM Do YYYY").month();
            let itemYear = moment(e.date,"MMM Do YYYY").year();

            console.log("ItemMth", itemMth);
            console.log("ItemYear", itemMth);
            
            if (itemYear === currentYear && itemMth === currentMth){
                return true;
            } else {
                return false;
            }
        });

        console.log("Data", data);

        result.data = data;
        result.message = "Data fetched successfully from database.";
        result.status = 200;   

        return result;
    },
};