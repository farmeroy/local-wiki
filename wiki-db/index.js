const express = require('express');
const sqlite3 = require("better-sqlite3");

const db = new sqlite3('./database.db') 


db.prepare(
  `CREATE TABLE IF NOT EXISTS pages (
  id INTEGER PRIMARY KEY AUTOINCREMENT, 
  name TEXT NOT NULL UNIQUE
  )`
).run();

db.prepare(
  `CREATE TABLE IF NOT EXISTS content (
  id INTEGER PRIMARY KEY AUTOINCREMENT, 
  change TEXT, 
  text TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  pages_id INTEGER,
  CONSTRAINT content_for_pages_id FOREIGN KEY (pages_id) REFERENCES pages (id) 
  )`
).run();

const app = express();
const port = 3000 || process.env.PORT;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Alive!'
  })
})


app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
