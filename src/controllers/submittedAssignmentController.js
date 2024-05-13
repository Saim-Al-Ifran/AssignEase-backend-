
const SubmittedAssignment = require("../model/SubmittedAssignment");
const { uploadImageToCloudinary } = require("../utils/imageUpload");
const Assignment = require('../model/Assignment');

const  submitAssignment = async (req, res) => {
   
    try {
      const { assignment, user, note } = req.body;
      const file = req.file; 

      if (!file) {
        return res.status(400).json({ success: false, error: 'No file uploaded' });
      }
  
      const cloudinaryResponse = await uploadImageToCloudinary(file);
  
      const submittedAssignment = new SubmittedAssignment({
        assignment,
        user,
        pdfDocLink: cloudinaryResponse.secure_url,
        note
      });
  
      await submittedAssignment.save();
  
      res.status(201).json({ success: true, data: submittedAssignment });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };


 const getSubmittedAssignmentsByUser = async (req, res) => {
    try {
        const userId = req.user._id;
        const { status } = req.query;
        let query = { user: userId };

        if (status) {
            query.status = status;
        }
 
        const submittedAssignments = await SubmittedAssignment.find(query);
        if(submittedAssignments.length === 0){
            return res.status(404).json({ message: 'No submitted assignments found' });
        }

        res.json({ success: true, data: submittedAssignments });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
 
const getCreatedAssignmentsByUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const createdAssignments = await Assignment.find({ createdBy: userId });

    res.json({ success: true, data: createdAssignments });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


  module.exports = {
    submitAssignment,
    getSubmittedAssignmentsByUser,
    getCreatedAssignmentsByUser
  }