
module.exports  = (express, router) => {
   require("./api/login")(router);
   require("./api/register")(router);
}
