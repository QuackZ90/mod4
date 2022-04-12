const { User, FollowChef } = require( "../model/model" );
const bcrypt = require( 'bcrypt' );
const jwt = require( 'jsonwebtoken' );
require('dotenv').config()
const saltRounds = 10;
let passwordHash = "";
const S3ProfilePic = require('aws-sdk/clients/s3');
const fs = require('fs');

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3ProfilePic = new S3ProfilePic({
    region,
    accessKeyId,
    secretAccessKey
});

module.exports = {

    register: async (newUserDetails) => {

        await User.sync(); // will create new table if table doesn't exist, otherwise does nth.

        let result = {
            message: null,
            status: null,
            data: null,
        }

        // Check if user is already registered in the system under email address.
        const user = await User.findAll({ where: { email: newUserDetails.email } });
        if ( user.length != 0 ){
            result.message = `Email address ${newUserDetails.email} already in use`;
            result.status = 404;
            return result;
        }

        // Generate hashed password to store in database
        try {
            passwordHash = bcrypt.hashSync(newUserDetails.pwd, saltRounds);
        } catch(err){
            console.log(err);
            result.status = 500;
            result.message = "User Creation fail. Please try again.";
            return result;
        }

        // Handling imageUrl for storage -- park a value for now

        const newUser = await User.create(
            {
                name: newUserDetails.name,
                email: newUserDetails.email, 
                hashedPwd: passwordHash,
                role: newUserDetails.role,
                profilePic: newUserDetails.profilePic || "imageURL",
                noOfFollows: 0
            }
        );

        result.data = newUser;
        result.status = 200;
        result.message = `New Account Registered Successfully.`;
        return result;
    },

    showAll: async () => {
        let result = {
            message: null,
            status: null,
            data: null
        }

        const data = await User.findAll(); // looking for all the users.

        result.message = "Data fetched successfully from database.";
        result.status = 200;   
        result.data = data;

        return result;
    },

    deleteUser: async (userId) => {

        // allow user to delete their own account via a delete button on the 
        // user profile page. The account id (or primary key) would be available. 

        let result = {
            message: null,
            status: null,
            data: null
        }

        // Check if user is already registered in the system under email address.
        const user = await User.findByPk(userId);
        if (!user){
            result.message = `User does not exist.`;
            result.status = 404;
            return result;
        }

        await user.destroy();
        result.status = 200;
        result.message = `User ID ${userId} deleted successfully`;
        return result;
    },

    login: async (email, password) => {

        let result = {
            message: null,
            status: null,
            jwt: null
        }

        let match = false;

        if (!email || !password){
            result.message = `Missing email or password in input.`;
            result.status = 404;
            return result;
        }

        // Look for the email in the database
        const login = await User.findAll({
            where: {
                email : email
            },
        });

        // check if email is already registered
        if ( login.length == 0 ){
            result.message = `Email: ${email} is not registered.`
            result.status = 404;
            return result;
        }

        match = await bcrypt.compare(password, login[0].hashedPwd);

        if (!match) {
            result.message = `Login Failed. Please check password.`;
            result.status = 404;
            return result;
        }

        // Generate JWToken here.

        const loginData = {
            id: login[0].id,
            email: login[0].email,
            role: login[0].role
        };

        const token = jwt.sign(loginData, process.env.JWT_SECRET_KEY);
        result.jwt = token;

        result.message = `Login Success!`;
        result.status = 200;
        return result;        
    },

    followUser: async (chefId, followerId) => {

        let result = {
            message: null,
            status: null,
            data: null
        }

        // check if chef and follow belong to user table.

        const chef = await User.findByPk(chefId);
        const follower = await User.findByPk(followerId);

        if (!chef){
            result.message = `Chef does not exist.`;
            result.status = 404;
            return result;
        }

        if (!follower){
            result.message = `Follower does not exist.`;
            result.status = 404;
            return result;
        }

        // check if chef is already followed by follower in the followChef table.

        const chefInTable = await FollowChef.findAll({
            where: {
                chefId : chefId,
                followerId : followerId
            },
        });

        if( chefInTable.length !== 0 ){
            result.message = `Already followed.`;
            result.status = 404;
            return result;
        }

        // if everything is all good, create new item in followChef table and 
        // edit the User table to increment noOfFollows.

        const newFollow = await FollowChef.create(
            {
                chefId: chefId,
                followerId: followerId
            }
        );

        chef.noOfFollows = chef.noOfFollows + 1;
        await chef.save();
        
        result.message = `Follow Completed Successfully!`;
        result.status = 200;
        result.data = chef;
        return result;   
    },

    unfollowUser: async (chefId, followerId) => {

        let result = {
            message: null,
            status: null,
            data: null
        }

        // check if chef and follow belong to user table.

        const chef = await User.findByPk(chefId);
        const follower = await User.findByPk(followerId);

        if (!chef){
            result.message = `Chef does not exist.`;
            result.status = 404;
            return result;
        }

        if (!follower){
            result.message = `Follower does not exist.`;
            result.status = 404;
            return result;
        }

        // check if chef is already followed by follower in the followChef table.

        const chefInTable = await FollowChef.findAll({
            where: {
                chefId : chefId,
                followerId: followerId
            },
        });

        if( chefInTable.length === 0 ){
            result.message = `User did not follow this chef yet.`;
            result.status = 404;
            return result;
        }

        console.log("ChefInTable", chefInTable);

        // if everything is all good, delete item in followChef table and 
        // edit the User table to decrease noOfFollows.

        const toDelete = await FollowChef.findByPk(chefInTable[0].id);

        await toDelete.destroy();

        chef.noOfFollows = chef.noOfFollows - 1;
        await chef.save();
        
        result.message = `Chef Unfollowed.`;
        result.status = 200;
        result.data = chef;
        return result;   
    },

    showPic: async (chefId) => {

        const chef = await User.findByPk(chefId);
    
        const downloadParams = {
            Key: chef.profilePic,
            Bucket: bucketName
        };

        return s3ProfilePic.getObject(downloadParams).createReadStream();

    }
};