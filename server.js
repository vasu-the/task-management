const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const authRoutes = require('./routers/authRoute');
const taskRoutes = require('./routers/taskRoute');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/', authRoutes);
app.use('/', taskRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(5000, () => console.log('Server running on port 5000')))
  .catch(err => console.log(err));

