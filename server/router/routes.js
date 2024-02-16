const express = require('express');
const route = express.Router();
const taskController = require('../controller/taskController')

route.post('/',taskController.create);
route.get('/',taskController.find);
route.get('/:id',taskController.findTask);
route.put('/:id',taskController.updateStatus);

module.exports = route