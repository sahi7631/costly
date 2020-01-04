const jwt = require('jsonwebtoken');
const global = require('../config/config');
const db = require('../config/database');
module.exports = (router) => {
    router.post("/login", (req, res) => {
        let userDetail = req.body;
        let loginQuery = `select name,password from register where name = '${userDetail.userName}' and password = '${userDetail.passWord}'`;
        if (userDetail.userName && userDetail.passWord) {
            db.query(loginQuery, (err, respose) => {
                if (err) {
                    res.status(400).send({
                        message: "Authentication Failed !!",
                        error: true,
                        data: []
                    });
                }
                else {
                    if (Array.isArray(respose.rows) && respose.rows.length > 0) {
                        let token = getToken({ id: userDetail.userName });
                        res.status(200).send({
                            message: "Login sucessfully !!",
                            data: { "token": token }
                        });
                    }
                    else{
                        res.status(400).send({
                            message: "Authentication Failed !!",
                            error: true,
                            data: []
                        });
                    }
                }
            });
        } else {
            res.status(400).send({
                message: "Something Went Wrong!!",
                error: true,
                data: []
            });
        }
    });
}
getToken = (payload) => {
    return jwt.sign({ payload }, global.config.secretKey, { expiresIn: 60 * 60 });
} 