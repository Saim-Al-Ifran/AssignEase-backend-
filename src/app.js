const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const userRoute = require('./routes/userRoute');
const assignmentRoute = require('./routes/assignmentRoute');
const submittedAssignmentRoute = require('./routes/submittedAssignment');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(helmet());

app.use('/api/v1/AssignmentEase',userRoute);
app.use('/api/v1/AssignmentEase/assignment',assignmentRoute);
app.use('/api/v1/AssignmentEase/assignment_submission',submittedAssignmentRoute);



// Default middleware for handling errors
app.use((err, _req, res, _next) => {
    const message = err.message || 'Server Error Occurred';
    const status = err.status || 500;  // Ensure status is set, default to 500
    res.status(status).json({
      message,
      status,
    });
  });


module.exports = app;
