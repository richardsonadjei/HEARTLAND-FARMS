// models/guineaFowlHealthRecords.model.js
import mongoose from 'mongoose';

const guineaFowlHealthRecordsSchema = new mongoose.Schema({
  batchNumber: {
    type: String,
    required: true,
  },
  observationDate: {
    type: Date,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  provisionalDiagnosis: {
    type: String,
    required: true,
  },
  recordedBy:{
    type: String,
    required: true,
  }
});

const GuineaFowlHealthRecords = mongoose.model('GuineaFowlHealthRecords', guineaFowlHealthRecordsSchema);

export default GuineaFowlHealthRecords;
