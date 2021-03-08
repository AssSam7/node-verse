const EventEmitter = require("events");
const http = require("http");

const myEmitter = new EventEmitter();

myEmitter.on("newSale", () => {
  console.log("Sale happened!");
});

myEmitter.on("newSale", (price) => {
  console.log(`Sale happened at ${price}$`);
});

myEmitter.emit("newSale", 10);

//////////////////////////

const server = http.createServer();

server.on("request", (req, res) => {
  console.log("Request received!");
  res.end("Request recieved");
});

server.on("request", (req, res) => {
  console.log("Another request!");
});

server.on("close", () => {
  console.log("Server closed!");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Waiting for requests...");
});
