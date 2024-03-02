const express = require("express");
const app = express();
const http = require("http");
const WebSocket = require("ws");
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
wss.on("connection", function connection(ws) {
  ws.on("message", function incoming(message, isBinary) {
    console.log(message.toString(), isBinary);
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        const { name, text } = JSON.parse(message.toString());
        if (text.toLowerCase() === "blue whale") {
          client.send(`${name} won $500`);
        } else {
          client.send(text);
        }
      }
    });
  });
});
app.get("/", (req, res) => {
  res.send("Hello World!");
});
server.listen(8080, () => {
  console.log("Listening to port 8080");
});
