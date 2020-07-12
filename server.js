// DEPENDANCIES
const express = require("express");
const path = require("path");
const fs = require("fs");

// CREATE SERVER
const app = express();

// INITIAL PORT
const PORT = process.env.PORT || 3000;

//  NOTE ARRAY

let noteArr = [];

// DATA PARSING
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//uses css
app.use(express.static(path.join(__dirname, "Develop/public")));

// ROUTER

// GET
app.get("/api/notes", function(req, res) {
  
  noteArr = fs.readFileSync("Develop/db/db.json", "utf8");
  noteArr = JSON.parse(noteArr);
  res.json(noteArr);
});

// POST
app.post("/api/notes", function(req, res) {

  noteArr = fs.readFileSync("./Develop/db/db.json", "utf8");
  console.log('Write');
  console.log(noteArr)

  noteArr = JSON.parse(noteArr);
  req.body.id = noteArr.length;
  noteArr.push(req.body);
  noteArr = JSON.stringify(noteArr);
 
  fs.writeFileSync("./Develop/db/db.json", noteArr, "utf8", function(err) {
  
    if (err) {
      console.log ('error')
    }
  });
  res.json(JSON.parse(noteArr));
});

// DELETE

app.delete("/api/notes/:id", function(req, res) {

  noteArr = fs.readFileSync("./Develop/db/db.json", "utf8");
  console.log('Delete')
 
  noteArr = JSON.parse(noteArr);

  noteArr = noteArr.filter(function(note) {
    return note.id != req.params.id;
  });
  
  noteArr = JSON.stringify(noteArr);
  
  fs.writeFileSync("./Develop/db/db.json", noteArr, "utf8", function(err) {
   
    if (err) {
      console.log('error')
    };
  });

  res.send(JSON.parse(noteArr));
});





// Start the server on the port
app.listen(PORT, function() {
console.log("App listening on PORT: " + PORT)
})
