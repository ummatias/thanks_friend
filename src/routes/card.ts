import express from 'express';
import CardController from '../controllers/card';

const deckController = new CardController();
const router = express.Router();

router.post('/card', deckController.createCard);
router.get('/card/:id', deckController.getCard);
router.put('/card/:id', deckController.updateCard);
router.delete('/card/:id', deckController.deleteCard);
router.get('/cards/:deckId', deckController.getCardsByDeck);

export default router;
