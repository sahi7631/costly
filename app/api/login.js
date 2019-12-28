const jwt = require('jsonwebtoken');
const global = require('../config/config');
module.exports = (router) => {
   router.post("/login", (req,res) => {
       let userDetail = req.body;
       let payload = { id: userDetail.userName };
       if(userDetail.userName && userDetail.passWord){
           let token = getToken(payload);
           res.send({
              status: 200,
              message: "Login sucessfully !!",
              data: { "token": token }
           });
       }
       else {
        res.send({
            status: 400,
            message: "Authentication Failed !!"
         });
       }
   });
}

getToken = (payload) => {
    return jwt.sign( { payload }, global.config.secretKey, { expiresIn: 60 * 60 } );
} 