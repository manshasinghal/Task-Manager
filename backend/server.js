require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/task-management-db';

mongoose.connect(MONGO_URI).then(() => {
  console.log('Connected to MongoDB successfully');
}).catch(err => {
  console.error('Could not connect to MongoDB:', err);
});

const authRoutes = require('./router/auth');
app.use('/api/auth', authRoutes);

const userRouter = require('./router/Userroute');
app.use('/api/users', userRouter);

const taskRouter = require('./router/taskRouter');
app.use('/api/tasks', taskRouter);


const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));


module.exports = app;
