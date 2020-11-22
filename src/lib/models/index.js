"use strict";
exports.__esModule = true;
exports.connectDb = void 0;
var mongoose_1 = require("mongoose");
var connectDb = function () {
    return mongoose_1["default"].connect("mongodb://localhost:27017/my-deck", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
};
exports.connectDb = connectDb;
