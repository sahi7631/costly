module.exports = (router) => {
    router.post('/register', (req,res) => {
        let userInfo = req.body;
        console.log("User Info !!");
        console.log(userInfo);
        if(userInfo){
            res.json({
                status: 200,
                message: "User Register Sucessfully !",
                data: []
            });
        } else {
            res.json({
                status: 400,
                message: "Some thing went Wrong !!",
                data: null
            });
        }
    });
}