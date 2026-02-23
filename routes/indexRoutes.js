const express = require('express')
const indexRouter = express.Router()

const {getIndex, getCreateForm, createNewMessage, getMessageById} = require('../controllers/indexController')

indexRouter.get('/',getIndex)
indexRouter.get('/new',getCreateForm)
indexRouter.post('/new',createNewMessage)
indexRouter.get('/messages/:id',getMessageById)


module.exports = indexRouter