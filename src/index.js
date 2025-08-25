import {WebSocket, WebSocketServer} from "ws";

const root = () => {
  const BACK_PORT = parseInt(process.env.USER_PORT || "");

  const wsServer = new WebSocketServer({port: BACK_PORT});
  console.log(wsServer.options.port, " port ");
  wsServer.on("connection", ws => {
    console.log("anybody has connected");
    ws.on("message", msg => {
      wsServer.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) client.send(String(msg));
      });
    });
    ws.on("close", test => {
      console.log("Any client disconected", test);
    });
  });
};
if (process.env.USER_NODE_ENV === "production") root();

export default root;
