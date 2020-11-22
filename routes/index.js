const mainRouter = require("express").Router();

mainRouter.use('/',(req,res) => (
    res.send("Hello From Express")
))

module.exports = mainRouter;