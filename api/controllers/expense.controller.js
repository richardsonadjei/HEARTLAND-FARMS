// Import ExpenseCategory model
import ExpenseCategory from '../models/expense.category.model.js';
// Import required modules
import FeedPurchase from '../models/feedPurchase.model.js'; // Adjust the path as needed
import ExpenseTransaction from '../models/expenseTransaction.model.js'; // Adjust the path as needed

// Controller to create a new expense category
export const createExpenseCategory = async (req, res) => {
  try {
    // Extract data from the request body
    const { name, description } = req.body;

    // Check if the expense category with the given name already exists
    const existingCategory = await ExpenseCategory.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ error: 'Expense category with this name already exists.' });
    }

    // Create a new expense category
    const newExpenseCategory = new ExpenseCategory({ name, description });

    // Save the new expense category to the database
    await newExpenseCategory.save();

    // Return a success response
    res.status(201).json({ success: true, data: newExpenseCategory });
  } catch (error) {
    console.error('Error creating expense category:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller to get all expense categories
export const getAllCategories = async (req, res) => {
  try {
    // Fetch all expense categories from the database
    const categories = await ExpenseCategory.find();

    // Return the categories as JSON
    res.json({ success: true, data: categories });
  } catch (error) {
    console.error('Error fetching expense categories:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Controller function to create a new feed purchase and corresponding expense transaction
export const createFeedPurchaseAndExpenseTransaction = async (req, res) => {
    try {
      // Extract feed purchase data from the request body
      const {
        feedName,
        supplier,
        feedCategory,
        manufactureDate,
        expiryDate,
        weightPerBag,
        quantityPurchased,
        costPerBag,
        paymentMethod,
        bankTransactionDetails: {
          bankName,
          paidInBy,
          accountNumber,
          transactionId: bankTransactionId,
        },
        momoTransactionDetails: {
          recipientName,
          momoNumber,
          transactionId: transactionID,
        },
        category, // New: Extract category from the request body
        purchasedBy, // New: Extract purchaseBy from the request body
      } = req.body;
  
      // Create a new FeedPurchase instance
      const newFeedPurchase = new FeedPurchase({
        feedName,
        supplier,
        feedCategory,
        manufactureDate,
        expiryDate,
        weightPerBag,
        quantityPurchased,
        costPerBag,
        paymentMethod,
        bankTransactionDetails: {
          bankName,
          paidInBy,
          accountNumber,
          transactionId: bankTransactionId,
        },
        momoTransactionDetails: {
          recipientName,
          momoNumber,
          transactionId: transactionID,
        },
        purchasedBy, // New: Include purchaseBy in the FeedPurchase model
      });
  
      // Save the new FeedPurchase
      await newFeedPurchase.save();
  
      // Create a new ExpenseTransaction instance
      const newExpenseTransaction = new ExpenseTransaction({
        category, // Use the category from the request body
        amount: newFeedPurchase.totalCost,
        description: `Feed purchase for ${quantityPurchased} bags of ${feedName}`,
        paymentMethod,
        bankTransactionDetails: {
          bankName,
          paidInBy,
          accountNumber,
          transactionId: bankTransactionId,
        },
        momoTransactionDetails: {
          recipientName,
          momoNumber,
          transactionId: transactionID,
        },
        purchasedBy, // New: Include purchaseBy in the ExpenseTransaction model
      });
  
      // Save the new ExpenseTransaction
      await newExpenseTransaction.save();
  
      // Return success response
      res.status(201).json({
        success: true,
        message: 'Feed purchase and expense transaction created successfully',
        data: {
          feedPurchase: newFeedPurchase,
          expenseTransaction: newExpenseTransaction,
        },
      });
    } catch (error) {
      console.error('Error creating feed purchase and expense transaction:', error);
      res.status(500).json({
        success: false,
        message: 'Internal Server Error. Please try again later.',
      });
    }
  };
  