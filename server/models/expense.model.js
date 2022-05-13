const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: [true, 'Name is required'],
        minlength: [3, 'Name must be at least 3 characters long']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price must be greater than 0']
    },
    date: {
        type: Date,
        required: [true, 'Date is required'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        minlength: [3, 'Description must be at least 3 characters long']
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        minlength: [3, 'Category must be at least 3 characters long']
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},
{timestamps: true}
);

const ExpenseModel = mongoose.model('ExpenseModel', ExpenseSchema);
module.exports = ExpenseModel;