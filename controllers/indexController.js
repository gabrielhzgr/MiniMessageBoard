const db = require('../db/queries')

async function getIndex(req,res){
    const messages = await db.getAllMessages()
    res.render('index',{title:'Mini Messageboard', messages})
}

function getCreateForm(req,res){
    res.render('form',{title: 'Mini Messageboard'})
}

async function createNewMessage(req,res){
    const {user, text} = req.body
    await db.insertMessage({user, text, added: new Date().toISOString()})
    res.redirect('/')
}

function getMessageById(req,res){
    
    try{
        let id = Number(req.params.id)
        const message = messages[id]
        if(!message){
            throw error
        }
        res.render('message',{title: 'Mini Messageboard', message: message})
    }catch(err){
        res.status(400).send('Message not found')
    }


}



module.exports = {getIndex, getCreateForm, createNewMessage, getMessageById}