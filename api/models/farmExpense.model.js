import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define FarmExpense schema
const farmExpenseSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    expenseCategory: {
        type: String,
        required: true
    },
    farmCategory: {
        type: String,
        enum: ['CashCrop', 'Vegetables', 'Farm-Animals', 'Birds']
    },
    type: {
        type: String,
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    description: {
        type: String,
        trim: true
    },
    recordedBy: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true }); // Add timestamps option here

// Create FarmExpense model
const FarmExpense = mongoose.model('FarmExpense', farmExpenseSchema);

export default FarmExpense;
