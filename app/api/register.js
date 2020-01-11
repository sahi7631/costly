module.exports = (app) => {
    app.post('/api/v1/register', (req, res) => {
        let userInfo = req.body;
        if (userInfo) {
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