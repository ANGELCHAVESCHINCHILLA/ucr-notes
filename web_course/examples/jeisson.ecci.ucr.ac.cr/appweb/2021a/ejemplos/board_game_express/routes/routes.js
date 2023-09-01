import express from 'express';
import path from 'path';

import error from '../controllers/error.js';
import game from '../controllers/game.js';
import homepage from '../controllers/homepage.js';
import log from '../controllers/log.js';

const router = express.Router();
const publicMiddleware = express.static(path.join(process.cwd(), 'public'));

//app.use('/', log);
router.use((req, res, next) => { log.logHttpRequest(req, res, next); });
router.use(express.urlencoded({ extended: false }));
router.get('/', (req, res) => {
  homepage.getHomepage(req, res);
});
router.post('/game_session', (req, res, next) => {
  game.postGameBoard(req, res, next);
});
// http://localhost:3000/game_session/18891
router.get('/game_session/:sessionId', (req, res, next) => {
  game.postGameBoard(req, res, next);
});
router.use(publicMiddleware);
router.use((req, res) => { error.getNotFound(req, res); });

export default router;
