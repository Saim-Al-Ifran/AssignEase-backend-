const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    marks: {
      type: Number,
      required: true
    },
    thumbnailUrl: {
      type: String,
      required: true
    },
    difficultyLevel: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      required: true
    },
    dueDate: {
      type: Date,
      required: true
    },
    createdBy:{
      type: String,
      required:true
    }
  });

  const Assignment = mongoose.model('Assignment', assignmentSchema);
  
  module.exports = Assignment;