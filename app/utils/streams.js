require("babel-register");

const { StreamsApp } = require("./streams-app");

console.log('args', process.argv.slice(2))

const app = new StreamsApp(process.argv);

console.log(app.argv)
