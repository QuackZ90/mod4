const mongoose = require('mongoose');
require('dotenv').config()

// Test connection function
async function testConnection() {
    try {
        await mongoose.connect(process.env.MONGOURI);
        console.log("Connection has been established successfully.");
        return true;
    } catch (error) {
        console.error("Unable to connect to the database:", error);
        return false;
    }
};

const userSchema = new mongoose.Schema({
    userId: { type: Number, required: true },
    items: [{
        amount: mongoose.Types.Decimal128,
        foreign_currency: String,
        foreign_currency_amount: mongoose.Types.Decimal128,
        forex: mongoose.Types.Decimal128,
        date: String,
        time: String,
        description: String,
        notes: String,
        category: String,
        receipt_image: String,
        auto_recurring: Boolean,
        spend_vs_earn: Boolean
    }]
});

const User = mongoose.model('User', userSchema, 'expenses');

module.exports = {
    testConnection,
    User
};








