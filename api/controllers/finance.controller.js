import assetsModel from "../models/assets.model.js";
import FarmExpense from "../models/farmExpense.model.js";
import PartnerContribution from "../models/partnersContribution.model.js";
import SalesIncome from "../models/salesIncome.model.js";


export const createSalesIncome = async (req, res) => {
    try {
        const {
            date,
            farmCategory,
            type,
            amount,
            description,
            recordedBy
        } = req.body;

        const newSalesIncome = new SalesIncome({
            date,
            farmCategory,
            type,
            amount,
            description,
            recordedBy
        });

        const savedSalesIncome = await newSalesIncome.save();
        res.status(201).json(savedSalesIncome);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getAllSalesIncome = async (req, res) => {
    try {
        const salesIncome = await SalesIncome.find();
        res.status(200).json(salesIncome);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateSalesIncome = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            date,
            farmCategory,
            type,
            amount,
            description,
            recordedBy
        } = req.body;

        const updatedSalesIncome = await SalesIncome.findByIdAndUpdate(
            id,
            {
                date,
                farmCategory,
                type,
                amount,
                description,
                recordedBy
            },
            { new: true }
        );

        if (!updatedSalesIncome) {
            return res.status(404).json({ message: 'SalesIncome not found' });
        }

        res.status(200).json(updatedSalesIncome);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteSalesIncome = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedSalesIncome = await SalesIncome.findByIdAndDelete(id);

        if (!deletedSalesIncome) {
            return res.status(404).json({ message: 'SalesIncome not found' });
        }

        res.status(200).json({ message: 'SalesIncome deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};






export const createFarmExpense = async (req, res) => {
  try {
    const { date, expenseCategory, farmCategory, type, amount, description, recordedBy, name } = req.body;

    // Create a new FarmExpense instance
    const newFarmExpense = new FarmExpense({
      date,
      expenseCategory,
      farmCategory,
      type,
      amount,
      description,
      recordedBy
    });

    // Save the FarmExpense document
    const savedFarmExpense = await newFarmExpense.save();

    // Check if the expenseCategory is "Assets Purchase"
    if (expenseCategory === 'Assets Purchase') {
      // Create a new Asset instance
      const newAsset = new assetsModel({
        name, // Use the name entered by the user
        description, // Use the description entered by the user
        acquisitionDate: date,
        value: amount
      });

      // Save the Asset document
      await newAsset.save();
    }

    res.status(201).json(savedFarmExpense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const getAllFarmExpenses = async (req, res) => {
  try {
    const farmExpenses = await FarmExpense.find();
    res.json(farmExpenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const getFarmExpenseById = async (req, res) => {
  const { id } = req.params;
  try {
    const farmExpense = await FarmExpense.findById(id);
    if (!farmExpense) {
      return res.status(404).json({ message: 'Farm Expense not found' });
    }
    res.json(farmExpense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateFarmExpenseById = async (req, res) => {
  const { id } = req.params;
  const { date, expenseCategory, farmCategory, type, amount, description, recordedBy } = req.body;
  try {
    const updatedFarmExpense = await FarmExpense.findByIdAndUpdate(id, {
      date,
      expenseCategory,
      farmCategory,
      type,
      amount,
      description,
      recordedBy
    }, { new: true });

    if (!updatedFarmExpense) {
      return res.status(404).json({ message: 'Farm Expense not found' });
    }

    res.json(updatedFarmExpense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




export const deleteFarmExpenseById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedFarmExpense = await FarmExpense.findByIdAndDelete(id);
    if (!deletedFarmExpense) {
      return res.status(404).json({ message: 'Farm Expense not found' });
    }
    res.json({ message: 'Farm Expense deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




export const getTotalContributions = async (req, res) => {
  try {
    // Aggregate pipeline to calculate total contributions per partner
    const pipeline = [
      {
        $unwind: '$contributions' // Deconstruct contributions array
      },
      {
        $group: {
          _id: '$contributions.partnerName', // Group by partnerName
          totalAmount: { $sum: '$contributions.amount' } // Calculate total amount per partner
        }
      },
      {
        $project: {
          _id: 0,
          partnerName: '$_id',
          totalAmount: 1
        }
      }
    ];

    const totalContributions = await PartnerContribution.aggregate(pipeline);

    // Format the response as partnerName: totalAmount
    const formattedResponse = totalContributions.reduce((acc, { partnerName, totalAmount }) => {
      acc[partnerName] = totalAmount;
      return acc;
    }, {});

    res.json(formattedResponse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




export const getTotalExpenseByCategory = async (req, res) => {
  try {
    const expenses = await FarmExpense.aggregate([
      {
        $group: {
          _id: '$expenseCategory',
          totalAmount: { $sum: '$amount' }
        }
      }
    ]);

    const totalByCategory = {};
    expenses.forEach(expense => {
      totalByCategory[expense._id] = expense.totalAmount;
    });

    res.status(200).json(totalByCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




export const getIncomeSummary = async (req, res) => {
  try {
    // Fetch overall total sales
    const sales = await SalesIncome.aggregate([
      {
        $group: {
          _id: null,
          totalSales: { $sum: '$amount' }
        }
      }
    ]);

    // Fetch overall partners contributions
    const contributions = await PartnerContribution.aggregate([
      {
        $group: {
          _id: null,
          totalContributions: { $sum: { $sum: '$contributions.amount' } }
        }
      }
    ]);

    // Extract the totals from the aggregation results
    const overallSales = sales.length > 0 ? sales[0].totalSales : 0;
    const overallContributions = contributions.length > 0 ? contributions[0].totalContributions : 0;

    // Return the combined results
    res.status(200).json({
      OverallSales: overallSales,
      OverallPartnersContribution: overallContributions
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getAssets = async (req, res) => {
  try {
    const assets = await assetsModel.find({}, 'name acquisitionDate value'); // Selecting specific fields
    res.json(assets);
  } catch (err) {
    console.error('Error fetching assets:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};




// Controller to fetch all partner contributions within a particular period
export const getContributionsWithinPeriod = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    // Parse startDate and endDate strings into Date objects in UTC format
    const parsedStartDate = new Date(startDate + 'T00:00:00Z'); // Assuming startDate is in YYYY-MM-DD format
    const parsedEndDate = new Date(endDate + 'T23:59:59.999Z'); // Assuming endDate is in YYYY-MM-DD format

    // Validate the dates
    if (isNaN(parsedStartDate.getTime()) || isNaN(parsedEndDate.getTime())) {
      return res.status(400).json({ message: 'Invalid date format. Please use YYYY-MM-DD format.' });
    }

    // Fetch the contributions within the specified date range
    const contributions = await PartnerContribution.find({
      date: {
        $gte: parsedStartDate,
        $lte: parsedEndDate
      }
    });

    res.status(200).json(contributions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contributions', error });
  }
};


// Controller to get all assets
export const getAllAssets = async (req, res) => {
  try {
    const assets = await assetsModel.find();
    res.status(200).json(assets);
  } catch (error) {
    console.error('Error fetching assets:', error);
    res.status(500).json({ message: 'Failed to fetch assets' });
  }
};



// Controller to edit an asset
export const editAsset = async (req, res) => {
  const { id } = req.params;
  const { name, description, acquisitionDate, value } = req.body;

  try {
    const updatedAsset = await assetsModel.findByIdAndUpdate(
      id,
      { name, description, acquisitionDate, value, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!updatedAsset) {
      return res.status(404).json({ message: 'Asset not found' });
    }

    res.status(200).json(updatedAsset);
  } catch (error) {
    console.error('Error updating asset:', error);
    res.status(500).json({ message: 'Failed to update asset' });
  }
};



// Controller to delete an asset
export const deleteAsset = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedAsset = await assetsModel.findByIdAndDelete(id);

    if (!deletedAsset) {
      return res.status(404).json({ message: 'Asset not found' });
    }

    res.status(200).json({ message: 'Asset deleted successfully' });
  } catch (error) {
    console.error('Error deleting asset:', error);
    res.status(500).json({ message: 'Failed to delete asset' });
  }
};
