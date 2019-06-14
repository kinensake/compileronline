const express = require("express");
const randstr = require("randomstring");
const fs = require("fs");
const exec = require("child_process").exec;
const bodyParser = require("body-parser");
const app = express();
app.listen(process.env.NODE_ENV || 3000);

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static("./public"));

app.get("/", function(req, res){
  res.render("index");
});

app.post("/", function(req, res){
  content = req.body.content;
  let file_name = randstr.generate(4);

  fs.mkdirSync(`./tmp/${file_name}`);
  fs.writeFileSync(`./tmp/${file_name}/${file_name}.cpp`, content);

  let command = `g++ tmp/${file_name}/${file_name}.cpp -o tmp/${file_name}/${file_name} ; ./tmp/${file_name}/${file_name}`;
  exec(command, function(err, stdout, stderr){

    if(err) res.status(200).json({kq: stderr});
    else{
      fs.unlinkSync(`./tmp/${file_name}/${file_name}`);
      res.status(200).json({kq: stdout});
    }

    fs.unlinkSync(`./tmp/${file_name}/${file_name}.cpp`);
    fs.rmdirSync(`./tmp/${file_name}`);
  });
})
