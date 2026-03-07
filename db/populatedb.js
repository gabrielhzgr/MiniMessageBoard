#! /usr/bin/env node

const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "user" VARCHAR ( 255 ),
  "text" VARCHAR ( 3000 ), 
  added DATE
);

INSERT INTO messages ("user","text",added)
VALUES
  ('Gabriel', 'Hi this my message for the board. I like animals.','${new Date().toISOString()}'),
  ('Maria', 'I''m a fictional character. I''m writing this message with fillers.','${new Date().toISOString()}'),
  ('Paul','Should be noted this is a postgresql + express exercise','${new Date().toISOString()}');
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.argv[2]
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
