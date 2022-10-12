import express from 'express';
import DeckController from '../controllers/deck';

const deckController = new DeckController();
const router = express.Router();

router.post('/deck', deckController.createDeck);
router.get('/deck/:id', deckController.getDeck);
router.get('/decks/:id', deckController.getDecksByUser);
router.get('/decks', deckController.getDecks);
router.put('/deck/:id', deckController.updateDeck);
router.delete('/deck/:id', deckController.deleteDeck);

export default router;
