
const SubmittedAssignment = require("../model/SubmittedAssignment");
const { uploadImageToCloudinary } = require("../utils/imageUpload");
const Assignment = require('../model/Assignment');
const User = require("../model/User");

const  submitAssignment = async (req, res) => {
   
    try {
      const { assignment, email, note,author } = req.body;
      const file = req.file; 
      console.log(req.body);
      if (!file) {
        return res.status(400).json({ success: false, error: 'No file uploaded' });
      }
  
      const cloudinaryResponse = await uploadImageToCloudinary(file);
  
      const submittedAssignment = new SubmittedAssignment({
        assignment,
        email,
        pdfDocLink: cloudinaryResponse.secure_url,
        note,
        author
      });
  
      await submittedAssignment.save();
  
      res.status(201).json({ success: true, data: submittedAssignment });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };


  const getSubmittedAssignmentsByUser = async (req, res) => {
    try {
        const { status, email } = req.query;
 
        let query = { email: email };

        if (status) {
            query.status = status;
        }
        const submittedAssignments = await SubmittedAssignment.find(query)
                                                              .populate('assignment');

        if (submittedAssignments.length === 0) {
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

 

const getAssignmentSubmissions = async (req, res) => {
  try {
      const { author } = req.query;
      if (!author) {
          return res.status(400).json({ message: 'Author email is required' });
      }

      console.log(`Author: ${author}`);
      
      const submittedAssignments = await SubmittedAssignment.find({ author })
                                                             .populate('assignment');

      if (submittedAssignments.length === 0) {
          return res.status(404).json({ message: 'No submitted assignments found' });
      }

      return res.status(200).json({ success: true, response: submittedAssignments });

  } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
  }
};


const getAssignmentSubmission = async (req, res) => {
  try {
      const { id } = req.params;
      const submission = await SubmittedAssignment.findById(id)
                                                  .populate('assignment');

      if (!submission) {
          return res.status(404).json({ message: 'Submitted assignment not found' });
      }

      return res.status(200).json({ success: true, data:submission });

  } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
  }
};

 



const assignMarks = async (req, res) => {
  try {
      const submittedAssignmentId = req.params.id;
      const { marks, feedback } = req.body;
      console.log(req.params.id);
  
      const submittedAssignment = await SubmittedAssignment.findById(submittedAssignmentId);

      if (!submittedAssignment) {
          return res.status(404).json({ success: false, error: 'Submitted assignment not found' });
      }
 
      submittedAssignment.marks = marks;
      submittedAssignment.feedback = feedback;
      submittedAssignment.status = 'completed';
      await submittedAssignment.save();

      return res.json({ success: true, message: 'Marks assigned successfully' });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, error: error.message });
  }
};

 



  module.exports = {
    submitAssignment,
    getSubmittedAssignmentsByUser,
    getCreatedAssignmentsByUser,
    getAssignmentSubmissions,
    getAssignmentSubmission,
    assignMarks
  }