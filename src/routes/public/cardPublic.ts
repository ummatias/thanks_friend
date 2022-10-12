import express from 'express';
import CardController from '../../controllers/card';

const cardController = new CardController();
const router = express.Router();

router.get('/cards/public/:deckId', cardController.getCardsByDeckPublic);

export default router;
