require("babel-register");

const { StreamsApp } = require("./streams-app");

const app = new StreamsApp(process.argv);

app.run();