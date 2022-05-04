const express = require("express");
const sqlite3 = require("better-sqlite3");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require('cors');

const path = "./database.db";
let db = null;
try {
  if (fs.existsSync(path)) {
    db = new sqlite3("./database.db");
  } else {
    // if the database doesn't exist
    db = new sqlite3("./database.db");
    // create the tables
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
  title TEXT NOT NULL,
  text TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  pages_id INTEGER NOT NULL,
  CONSTRAINT content_for_pages_id FOREIGN KEY (pages_id) REFERENCES pages (id) 
  )`
    ).run();
    // create the basic "Main Page"
    // db.prepare(
    //   `
    //   INSERT INTO pages
    //   VALUES (name)
    //   ('Main Page')
    //   `
    // ).run();
  }
} catch (err) {
  console.log(err);
}
const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors())
const port = 5000 || process.env.PORT;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Alive!",
  });
});

// Get a wiki page from the database
// returns the most recent edit
app.get("/pages/:name", (req, res, next) => {
  const getPageContent = db.prepare(`
    SELECT
      text,
      title,
      pages_id
    FROM
      content
    INNER JOIN pages ON pages.id = content.pages_id
    WHERE
      pages.name = (?)
    AND
      created_at = (SELECT MAX(created_at) FROM content)
  `);
  const pageContent = getPageContent.all(req.params.name) 
  res.json(pageContent);
});

app.put("/pages/create", (req, res) => {
  const createPage = db.prepare(`
    INSERT INTO pages
    (name) VALUES
    (?)
  `);
  const page = createPage.run(req.body.name);
  console.log(page)
  const getPage = db.prepare(`
    SELECT * FROM page
    WHERE name = (?)
  `);
  res.json(getPage.all(req.body.name));
})

// Add an edit to a wiki page
app.put("/pages/:name/edit", (req, res) => {
  const newTitle = req.body.title;
  const newText = req.body.text;
  const pagesId = req.body.pages_id;
  const change = req.body.change;
  console.log(req.body)
  const addEdit = db.prepare(`
    INSERT INTO content
    (title, text, pages_id, change) VALUES
    (?, ?, ?, ?)
  `);
  const edit = res.json(addEdit.run(newTitle, newText, pagesId, change))

});

// View all edits to a wiki page
app.get("/pages/:name/history", (req, res) => {
const getPageContent = db.prepare(`
    SELECT
      change,
      created_at,
      title
    FROM
      content
    INNER JOIN pages ON pages.id = content.pages_id
    WHERE
      pages.name = (?)
    ORDER BY created_at DESC
  `);
  const history = res.json(getPageContent.all(req.params.name));

});

// View the diff between edits
app.get("/pages/:name/:id/diff", (req, res) => {

const getPageDiff = db.prepare(`
    SELECT
      change,
      created_at,
      title,
      text,
      content.id
    FROM
      content
    INNER JOIN pages ON pages.id = content.pages_id
    WHERE
      pages.name = (?)
    AND 
      content.id = ${req.params.id}
    OR
       created_at = (SELECT MAX(created_at) FROM content)
    ORDER BY created_at DESC
  `);
  const history = res.json(getPageDiff.all(req.params.name));

});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
