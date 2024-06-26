const mongoose = require('mongoose');

const submittedAssignmentSchema = new mongoose.Schema({
    assignment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Assignment',
      required: true
    },
    email: {
      type:String,
      required: true
    },
    pdfDocLink: {
      type: String,
      required: true
    },
    note: {
      type: String
    },
    status: {
      type: String,
      enum: ['pending', 'completed'],
      default: 'pending'
    },
    marks: {
      type: Number
    },
    feedback: {
      type: String
    },
    author:{
      type:String,
      required:true
    }
  });
  

const SubmittedAssignment = mongoose.model('SubmittedAssignment', submittedAssignmentSchema);

module.exports = SubmittedAssignment;