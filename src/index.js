import {WebSocket, WebSocketServer} from "ws";

const root = () => {
  const BACK_PORT = parseInt(process.env.USER_PORT || "");

  const wsServer = new WebSocketServer({port: BACK_PORT});
  console.log(wsServer.options.port, " port ");
  wsServer["clientsUnicId"] = [];
  wsServer.on("connection", ws => {
    const newClientId = new Date().getMilliseconds();
    console.log("anybody has connected", newClientId);

    wsServer["clientsUnicId"] = [...wsServer?.clientsUnicId, newClientId];
    ws.send(
      JSON.stringify({
        wsServer: "client identify",
        text: `Сервер приветствует тебя!\n\ Твой id ${newClientId} //c:WS`,
        clientId: newClientId,
      }),
    ); // Приветствие сервера при первом подключении. Можно настроить авторизацию и вернуть клиенту его айдишник
    ws.on("message", msg => {
      wsServer.clients.forEach(client => {
        console.log(String(msg), " cur msg");
        if (client.readyState === WebSocket.OPEN) client.send(String(msg));
      });
    });
    ws.on("close", (test, reason) => {
      console.log("Any client disconected");
    });
  });
};
if (process.env.USER_NODE_ENV === "production") root();

export default root;
