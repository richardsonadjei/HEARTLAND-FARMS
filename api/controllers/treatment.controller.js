import BirdTreatment from '../models/treatment.model.js';

const birdTreatmentController = {
  // Create a new bird treatment record
  createBirdTreatment: async (req, res) => {
    try {
      const {
        batchNumber,
        diagnosis,
        medications,
        notes,
        treatmentDoneBy,
      } = req.body;

      const newBirdTreatment = new BirdTreatment({
        batchNumber,
        diagnosis,
        medications,
        notes,
        treatmentDoneBy,
      });

      const savedTreatment = await newBirdTreatment.save();

      res.status(201).json({ success: true, data: savedTreatment });
    } catch (error) {
      console.error('Error creating bird treatment:', error.message);
      res.status(500).json({ success: false, error: 'Server Error' });
    }
  },

  // Get all bird treatment records
  getAllBirdTreatments: async (req, res) => {
    try {
      const birdTreatments = await BirdTreatment.find();
      res.status(200).json({ success: true, data: birdTreatments });
    } catch (error) {
      console.error('Error fetching bird treatments:', error.message);
      res.status(500).json({ success: false, error: 'Server Error' });
    }
  },

  // Get a specific bird treatment record by ID
  getBirdTreatmentById: async (req, res) => {
    try {
      const birdTreatment = await BirdTreatment.findById(req.params.id);

      if (!birdTreatment) {
        return res.status(404).json({ success: false, error: 'Treatment not found' });
      }

      res.status(200).json({ success: true, data: birdTreatment });
    } catch (error) {
      console.error('Error fetching bird treatment:', error.message);
      res.status(500).json({ success: false, error: 'Server Error' });
    }
  },

  // Update a bird treatment record by ID
  updateBirdTreatmentById: async (req, res) => {
    try {
      const updatedTreatment = await BirdTreatment.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );

      if (!updatedTreatment) {
        return res.status(404).json({ success: false, error: 'Treatment not found' });
      }

      res.status(200).json({ success: true, data: updatedTreatment });
    } catch (error) {
      console.error('Error updating bird treatment:', error.message);
      res.status(500).json({ success: false, error: 'Server Error' });
    }
  },

  // Delete a bird treatment record by ID
  deleteBirdTreatmentById: async (req, res) => {
    try {
      const deletedTreatment = await BirdTreatment.findByIdAndDelete(req.params.id);

      if (!deletedTreatment) {
        return res.status(404).json({ success: false, error: 'Treatment not found' });
      }

      res.status(200).json({ success: true, data: deletedTreatment });
    } catch (error) {
      console.error('Error deleting bird treatment:', error.message);
      res.status(500).json({ success: false, error: 'Server Error' });
    }
  },

  // Get bird treatments for a specific batch
  getBirdTreatmentsByBatch: async (req, res) => {
    try {
      const { batchNumber } = req.params;

      const birdTreatments = await BirdTreatment.find({ batchNumber });

      if (birdTreatments.length === 0) {
        return res.status(404).json({ success: false, error: 'No treatments found for the specified batch' });
      }

      res.status(200).json({ success: true, data: birdTreatments });
    } catch (error) {
      console.error('Error fetching bird treatments by batch:', error.message);
      res.status(500).json({ success: false, error: 'Server Error' });
    }
  },
};

export { birdTreatmentController as default };
