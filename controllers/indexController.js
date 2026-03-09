const db = require('../db/queries')
const {body, validationResult, matchedData} = require('express-validator')

async function getIndex(req,res){
    const messages = await db.getAllMessages()
    res.render('index',{title:'Mini Messageboard', messages})
}

function getCreateForm(req,res){
    res.render('form',{title: 'Post a new Message'})
}

const validateUser = [
    body('user').trim()
        .isLength({max:255}).withMessage('user must be max. 255 characters'),
    body('text').trim()
        .isLength({max:3000}).withMessage('message must be max. 3000 characters')
]

const createNewMessage = [validateUser, async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).render('form',{
            title:'Post a new Message',
            errors:errors.array()
        })
    }
    const {user, text} = req.body
    await db.insertMessage({user, text, added: new Date().toISOString()})
    res.redirect('/')
}]

async function getMessageById(req,res){
    
    try{
        let id = Number(req.params.id)
        const message = await db.getMessageById(id)
        if(message.rows.length==0){
            throw error
        }
        res.render('message',{title: 'Mini Messageboard', message: message.rows[0]})
    }catch(err){
        res.status(400).send('Message not found')
    }


}



module.exports = {getIndex, getCreateForm, createNewMessage, getMessageById}