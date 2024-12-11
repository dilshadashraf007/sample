import "./start/addRequire.js";
const express = require('express');
const authRoutes = require('../routes/authRoutes');
const eventRoutes = require('../routes/eventroutes');
const taskRoutes = require('../routes/taskRoutes');
const userRoutes = require('../routes/userRoutes'); 
const feedbackRoutes=require('../routes/feedbackRoutes');
const notificationRoutes=require('../routes/notificationRoutes');

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes); 
app.use('/api/notification', notificationRoutes); 
app.use('/api/feedback', feedbackRoutes); 
const PORT = process.env.PORT || 5000;
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
