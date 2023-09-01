import Player from "../models/Player.js";

const sessions = new Map();

class GameSession {
  constructor() {
    this.id = sessions.size() + 1;
    sessions.set(this.id, this);
  }
}

class GameController {
  postGameBoard(req, res) {
    const sessionId = req.params.sessionId ?? -1;
    console.log(req.body);
    const player = new Player(req.body.nickname);
    // res.redirect('/board_game3.xhtml');
    res.render('board_game', {
      title: `Board ${sessionId}`,
      stylesheets: ['/css/board.css'],
      player: player,
      rivals: player.getRivalsFunctional(),
      scripts: ['/js/board_game.js'],
    });
  }
}

// Singleton
const game = new GameController();
export default game;
