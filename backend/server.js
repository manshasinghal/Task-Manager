require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongo:27017/tasks';

mongoose.connect(MONGO_URI).then(() => {
  console.log('Connected to MongoDB successfully');
}).catch(err => {
  console.error('Could not connect to MongoDB:', err);
});

const userRouter = require('./router/Userroute');
app.use('/api', userRouter);

const taskRouter = require('./router/taskRouter');
app.use('/api', taskRouter);

app.get('/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 5000;
if (require.main === module) {
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
}

module.exports = app;
