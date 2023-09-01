export default class Player {
  constructor(nickname) {
    this.nickname = nickname;
    this.score = 0;
  }

  addScore(points) {
    this.score += points;
  }

  getRivalsProcedural() {
    const rivals = [];
    const players = Player.getAllPlayers();
    for (let index = 0; index < players.length; ++index) {
      if (players[index].nickname !== this.nickname) {
        rivals.push(players[index]);
      }
    }
    return rivals;
  }

  getRivalsFunctional() {
    return Player.getAllPlayers().filter(player => player.nickname !== this.nickname);
  }

  static getAllPlayers() {
    const players = [
      new Player('Chema'),
      new Player('Pinocho'),
      new Player('Osqui'),
    ];
    return players;
  }

  // save()
  // load()
}
