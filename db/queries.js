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

module.exports = { getAllMessages, insertMessage }