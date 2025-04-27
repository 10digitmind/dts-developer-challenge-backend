// backend/routes/taskRoutes.js

const express = require('express');
const router = express.Router();
const { createTask,getALLTasks ,deleteTask,updateTask,getTaskById} = require('../taskController');

// POST route to create a task
router.post('/api/createtask', createTask);
router.get('/api/getalltasks', getALLTasks);
router.delete('/api/deletetask/:id', deleteTask);
router.patch('/api/updatetask/:id', updateTask);
router.get('/api/getbyid/:id', getTaskById);


module.exports = router;
