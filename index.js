require("babel-register");

const config = require("./config");
const { User, Product } = require("./models");

console.log("app name:", config.App.name);

const user = new User();
const product = new Product();