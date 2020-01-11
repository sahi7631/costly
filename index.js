const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const global = require('./app/config/config');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("defaultPort", 3000);
var PORT = process.env.PORT || app.get("defaultPort");

app.get("/", (req, res) => {
    res.json({
        status: 200,
        success: true,
        message: "Welcome to Costly Server !",
    })
});

router.use((req, res, next) => {
    let token = req.body.token || req.param('token') || req.header['x-access-token'];
    if (token) {
        jwt.verify(token, global.config.secretKey, (err, decoded) => {
            if (err) res.json({
                success: false,
                status: 400,
                message: 'Failed to authenticate token.'
            });
            else {
                req.decoded = decoded;	
                next();
            }
        });
    }
});

require("./app/api/login")(app);
require("./app/api/register")(app);
app.use("/app/v1", router);
require("./app/route")(router)

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});