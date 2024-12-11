const dotenv = require('dotenv');
dotenv.config();

const connectDB = require("./config/db")
connectDB()

const bodyParser = require("body-parser")

const cors = require('cors');
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventroutes');
//const feedbackRoutes = require('./routes/feedbackRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const profileRoutes = require("./routes/profileRoutes")
const workType=require("./routes/worktype");

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors());




app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/Task', taskRoutes);
app.use('/api/users', userRoutes);
app.use("/api/users", profileRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('api/users/update-work-type',workType)
//app.use('/api/feedback', feedbackRoutes);


// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
  