"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
var express = require("express");
var typescript_rest_1 = require("typescript-rest");
var HelloService = /** @class */ (function () {
    function HelloService() {
    }
    HelloService.prototype.sayHello = function (name) {
        return "Hello " + name;
    };
    __decorate([
        typescript_rest_1.Path(":name"),
        typescript_rest_1.GET,
        __param(0, typescript_rest_1.PathParam("name"))
    ], HelloService.prototype, "sayHello");
    HelloService = __decorate([
        typescript_rest_1.Path("/hello")
    ], HelloService);
    return HelloService;
}());
var app = express();
typescript_rest_1.Server.buildServices(app);
app.listen(3000, function () {
    console.log("listening on port 3000!");
});
