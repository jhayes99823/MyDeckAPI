"use strict";
exports.__esModule = true;
var express_1 = require("express");
var router = express_1["default"].Router();
router.get("/", function (req, res) {
    res.json({
        message: "Welcome to Deck of Cards REST API using nodeJS, ExpressJS and MongoDB, You can read the documentation at README.md",
        author: "Jordan Hayes",
        email: "hayesja99@gmail.com",
        github: "github.com/jhayes99823"
    });
});
exports["default"] = router;
