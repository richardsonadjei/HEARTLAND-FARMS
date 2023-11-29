// Import ExpenseCategory model
import ExpenseCategory from '../models/expense.category.model.js';
// Import required modules
import FeedPurchase from '../models/feedPurchase.model.js'; // Adjust the path as needed
import ExpenseTransaction from '../models/expenseTransaction.model.js'; // Adjust the path as needed
// Import required modules
import FeedName from '../models/feedName.model.js';
// Import the FeedStock model
import FeedStock from '../models/feedStock.model.js';


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
      category,
      purchasedBy,
    } = req.body;

    // Parse quantityPurchased to a number
    const quantityPurchased = parseFloat(req.body.quantityPurchased);

    // Check if a record with the same feedName and costPerBag already exists in FeedPurchase
    const existingFeedPurchase = await FeedPurchase.findOne({
      feedName,
      costPerBag,
    });

    if (existingFeedPurchase) {
      // If exists, update quantityInStock by adding quantityPurchased
      existingFeedPurchase.quantityInStock += quantityPurchased;
      await existingFeedPurchase.save();

      // Use the existing record for creating the ExpenseTransaction
      const newExpenseTransaction = new ExpenseTransaction({
        category,
        amount: quantityPurchased * costPerBag,
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
        purchasedBy,
      });

      // Save the new ExpenseTransaction
      await newExpenseTransaction.save();

      // Update or create FeedStock based on feedName, feedCategory, manufactureDate, and expiryDate
      const existingFeedStock = await FeedStock.findOne({
        feedName,
        feedCategory,
        manufactureDate,
        expiryDate,
      });

      if (existingFeedStock) {
        // If exists, update quantityInStock by adding quantityPurchased
        existingFeedStock.quantityInStock += quantityPurchased;
        existingFeedStock.lastUpdated = Date.now();
        await existingFeedStock.save();
      } else {
        // If the record doesn't exist, create a new FeedStock
        const newFeedStock = new FeedStock({
          feedPurchaseId: existingFeedPurchase._id,
          feedName,
          feedCategory,
          manufactureDate,
          expiryDate,
          quantityInStock: quantityPurchased,
        });

        // Save the new FeedStock
        await newFeedStock.save();
      }

      // Return success response
      return res.status(201).json({
        success: true,
        message: 'Feed purchase and expense transaction created successfully',
        data: {
          feedPurchase: existingFeedPurchase,
          expenseTransaction: newExpenseTransaction,
        },
      });
    }

    // If the record doesn't exist, create a new FeedPurchase
    const newFeedPurchase = new FeedPurchase({
      feedName,
      supplier,
      feedCategory,
      manufactureDate,
      expiryDate,
      weightPerBag,
      quantityPurchased,
      quantityInStock: quantityPurchased,
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
      purchasedBy,
    });

    // Save the new FeedPurchase
    await newFeedPurchase.save();

    // Create a new ExpenseTransaction instance
    const newExpenseTransaction = new ExpenseTransaction({
      category,
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
      purchasedBy,
    });

    // Save the new ExpenseTransaction
    await newExpenseTransaction.save();

    // Create a new FeedStock instance
    const newFeedStock = new FeedStock({
      feedPurchaseId: newFeedPurchase._id,
      feedName,
      feedCategory,
      manufactureDate,
      expiryDate,
      quantityInStock: quantityPurchased,
    });

    // Save the new FeedStock
    await newFeedStock.save();

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



  
 



// Controller function to create a new feedName
const createFeedName = async (req, res) => {
  try {
    // Extract data from the request body
    const { name } = req.body;

    // Check if the feedName already exists
    const existingFeedName = await FeedName.findOne({ name });
    if (existingFeedName) {
      return res.status(400).json({ error: 'FeedName already exists' });
    }

    // Create a new feedName instance
    const newFeedName = new FeedName({
      name,
    });

    // Save the new feedName to the database
    await newFeedName.save();

    // Respond with the created feedName
    res.status(201).json(newFeedName);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Export the controller function
export { createFeedName };


// Controller function to get all feed names
export const getAllFeedNames = async (req, res) => {
  try {
    // Fetch all feed names from the database
    const feedNames = await FeedName.find();

    // Return the feed names as JSON
    res.json({ success: true, data: feedNames });
  } catch (error) {
    console.error('Error fetching feed names:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};




// Controller function to get all expense transactions of category "Feed Costs" within a specific period
export const getFeedPurchaseTransactionsByDate = async (req, res) => {
  try {
    // Extract start and end dates from the request query parameters
    const { startDate, endDate } = req.query;

    // Parse the dates to UTC format
    const parsedStartDate = new Date(`${startDate}T00:00:00Z`);
    const parsedEndDate = new Date(`${endDate}T23:59:59Z`);

    // Fetch all expense transactions within the specified date range and category "Feed Costs"
    const transactions = await ExpenseTransaction.find({
      category: 'Feed Purchase',
      date: {
        $gte: parsedStartDate,
        $lte: parsedEndDate,
      },
    });

    // Return the transactions as JSON
    res.json({ success: true, data: transactions });
  } catch (error) {
    console.error('Error fetching feed cost transactions:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

