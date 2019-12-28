const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const db = require('./app/config/database');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var PORT = process.env.PORT;

app.get("/", (req,res) => {
    let loginTable = "CREATE  TABLE USER  ( " +
        "`firstName` INT  AUTOINCREMENT " +
        "`lastName`  VARCHAR(150) NOT NULL " +
        "`mobileNumber` VARCHAR(10)" +
        "`email` VARCHAR(50)" +
        "`password` VARCHAR(255" + 
        "PRIMARY KEY ('mobileNumber') )"
      db.query(loginTable, (res, err) => {
          console.log(err);
          console.log(err);
        //   if(err){
        //       throw new Error("Some thing Went Wrong !");
        //   } else {
        //     console.log("Result");
        //     console.log(result);
        //   }
      });
   res.json({
       status: 200,
       message: "Welcome to Costly Server !",
       data: []
   })
});

router.use((req,res,next) => {
    console.log("Request Date" + Date.now());
    next();
});

app.use("/snapshort", router);
require("./app/route")(express, router)

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});