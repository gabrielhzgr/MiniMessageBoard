const pool = require("./pool")

async function getAllMessages(){
    const {rows} = await pool.query("SELECT * FROM messages")
    return rows
}

async function insertMessage(msg){
    await pool.query(
        'INSERT INTO messages ("user","text",added) VALUES ($1, $2, $3)',
        [msg.user, msg.text, msg.added])
}

async function getMessageById(id){
    const row = await pool.query(
        'SELECT * FROM messages WHERE id = $1',
        [id]
    )
    return row
}

module.exports = { getAllMessages, insertMessage, getMessageById }