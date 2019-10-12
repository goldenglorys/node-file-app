const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

let app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
const port = 8081;
let returns = false

app.get("/", (req, res) => {
  fs.readdir('./writeFolder', (err, files)=>{
    if(err) console.log(err)
    else res.render("textEditor", { files })
  })
});

app.post("/sendFile", (req, res) => {
  fs.mkdir('writeFolder', (err)=>{
    if(err) console.log('Directory already created')
  })
  fs.readdir('./writeFolder', (err, files)=>{
    if(err) console.log(err)
    else {
      console.log('Results', files)
        fs.writeFile('./writeFolder/'+req.body.save, req.body.text, (err) => {
          if (err) console.log(err)
          console.log("Saved!")
          returns = true
          console.log(returns)
          res.render("textEditor", { files })
        })
    }
  })
})

app.post("/readFile", (req, res) => {
  fs.readFile('./writeFolder/'+req.body.readName, "utf-8", (err, data) => {
    // res.writeHead(200, { "Content-Type": "text/html" })
    if(err) console.log(err)
    fs.readdir('./writeFolder', (err, files)=>{
      if(err) console.log(err)
      else {
        res.render("textEditor", { data, files })
      }
    })
  });
});

app.listen(port, () => {
  console.log("Server started and listening at " + port);
});
