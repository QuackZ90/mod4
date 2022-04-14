const userService = require("../services/user.services");
const itemService = require("../services/items.services");

class UserController {

    async register(req, res, next){

        const result = await userService.register(req.body);

        res.status(result.status);

        return res.json({
            data: result.data,
            status_code: result.status,
            message: result.message,
        });
    }

    async deleteUser(req, res, next){

        const result = await userService.deleteUser(req.body.userId);

        res.status(result.status);

        return res.json({
            data: result.data,
            status_code: result.status,
            message: result.message,
        });
    }

    async addItem(req, res, next){

        // req.body need to contain an object that gives the details of the item to be added.

        const result = await itemService.addItem(req.user.userId, req.body);

        res.status(result.status);

        return res.json({
            data: result.data,
            status_code: result.status,
            message: result.message,
        });
    }

    async deleteItem(req, res, next){

        const result = await itemService.deleteItem(req.user.userId, req.body.itemId);

        res.status(result.status);

        return res.json({
            data: result.data,
            status_code: result.status,
            message: result.message,
        });
    }

    // async editItem(req, res, next){

    //     const result = await itemService.editItem(req.user.userId, req.body);

    //     res.status(result.status);

    //     return res.json({
    //         status_code: result.status,
    //         message: result.message,
    //     });
    // }

    async showAllItems(req, res, next){

        // showing all items for the current month + last 3 months only.

        const result = await itemService.showAllItems(req.user.userId);

        res.status(result.status);

        return res.json({
            data: result.data,
            status_code: result.status,
            message: result.message,
        });
    }
}

module.exports = UserController;