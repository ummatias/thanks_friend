import express from 'express';
import DeckController from '../controllers/deck';

const deckController = new DeckController();
const router = express.Router();

router.post('/deck', deckController.createDeck);
router.get('/deck/:id', deckController.getDeck);
router.get('/decks', deckController.getDecks);
router.put('/deck/:id', deckController.updateDeck);
router.delete('/deck/:id', deckController.deleteDeck);
router.get('/deck/:id', deckController.getDeckByUser);
router.get('/decks/:id', deckController.getDecksByUser);
router.delete('/decks', deckController.deleteAll);

export default router;
