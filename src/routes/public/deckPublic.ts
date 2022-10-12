import express from 'express';
import DeckController from '../../controllers/deck';

const deckController = new DeckController();
const router = express.Router();

router.get('/decks/public', deckController.getDecksPublic);
router.get('/deck/public/:id', deckController.getDeckPublic);

export default router;
