import express from 'express';
import * as eta from 'eta';
import ws from 'ws';

import router from './routes/routes.js';
import Player from './models/Player.js';

const app = express();

// app.set('x-powered-by', false);
app.disable('x-powered-by');

// Set Eta as view engine
app.engine('eta', eta.renderFile);
app.set('view engine', 'eta');

let playerCount = 0;
const wsPlayers = new Map(); // socket -> Player
const nicknamePlayers = new Map(); // nickname -> Player
const playerSessions = new Map(); // socket -> sessionId
const sessions = new Map(); // sessionId -> new Session()

// See https://masteringjs.io/tutorials/express/websockets
// Set up a headless websocket server that prints any
// events that come in.
const wsServer = new ws.Server({ noServer: true });
wsServer.on('connection', (socket) => {
  // A new connection was established
  wsPlayers.set(socket, `Player ${++playerCount}`);
  console.log(`${wsPlayers.get(socket)} connected`);

  socket.on('message', (text) => {
    console.log(`${wsPlayers.get(socket)} sent ${text}`);
    const message = JSON.parse(text);
    switch (message.type) {
      case 'playerAnnouncement':
        const player = nicknamePlayers.get(message.nickname);
        if (player) {
          wsPlayers.set(this, player);
        } else {
          const newPlayer = new Player(message.nickname);
          wsPlayers.set(this, newPlayer);
          nicknamePlayers.set(message.nickname, newPlayer);
        }
        break;
    }
  });

  socket.on('close', () => {
    console.log(`${wsPlayers.get(socket)} closed the connection`);
    wsPlayers.delete(socket);
  });
});

app.use(router);

const webServer = app.listen(3000);
webServer.on('upgrade', (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, socket => {
    wsServer.emit('connection', socket, request);
  });
});
console.log(`board_game listening on 3000....`);
