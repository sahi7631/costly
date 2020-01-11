const jwt = require('jsonwebtoken');
const global = require('../config/config');
const db = require('../config/database');
module.exports = (app) => {
    app.post("/api/v1/login", (req, res) => {
        let userDetail = req.body;
        let loginQuery = `select name,password from register where name = '${userDetail.userName}' and password = '${userDetail.passWord}'`;
        if (userDetail.userName && userDetail.passWord) {
            db.query(loginQuery, (err, respose) => {
                if (err) {
                    res.json({
                        status: 400,
                        success: false,
                        message: "Authentication Failed !!",
                    });
                }
                else {
                    if (Array.isArray(respose.rows) && respose.rows.length > 0) {
                        let token = getToken({ id: userDetail.userName });
                        res.json({
                            status: 200,
                            success: true,
                            data: { "token": token },
                            message: "Login sucessfully !!"
                        });
                    }
                    else{
                        res.json({
                            success: false,
                            status: 400,
                            message: "Authentication Failed !!",
                        });
                    }
                }
            });
        } else {
            res.json({
                success: false,
                status: 400,
                message: "Something Went Wrong!!",
            });
        }
    });
}
getToken = (payload) => {
    return jwt.sign({ payload }, global.config.secretKey, { expiresIn: 60 * 60 });
} 