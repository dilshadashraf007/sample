// backend/routes/notificationRoutes.js
const express = require('express');
const notificationController = require('../controllers/notificationController');
const authMiddleware=require ('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, notificationController.createNotification);

router.get("/", (req, res)=>{
  return res.status(200).json({message: "no notification"})
})
// router.get('/', authMiddleware, notificationController.getNotifications); // Protected route to fetch notifications
router.patch('/:notification_id', authMiddleware, notificationController.markAsRead);

module.exports=router;
