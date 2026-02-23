const messages = require('../messages')

function getIndex(req,res){
    res.render('index',{title:'Mini Messageboard' ,messages})
}

function getCreateForm(req,res){
    res.render('form',{title: 'Mini Messageboard'})
}

function createNewMessage(req,res){
    const {messageUser, messageText} = req.body
    messages.push({user: messageUser, text: messageText, added: new Date()})
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