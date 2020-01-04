const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const db = require('./app/config/database');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var PORT = process.env.PORT || 3000;

app.get("/", (req,res) => {
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