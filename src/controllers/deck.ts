import { Request, Response, NextFunction } from 'express';
import DeckService from '../services/deckService';
import CardService from '../services/cardService';

export default class DeckController {
  private deckService = new DeckService();
  private cardService = new CardService();

  public createDeck = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const deck = req.body;
    try {
      const created_deck = await this.deckService.createDeck(deck);
      return res.status(201).json({
        deck: created_deck
      });
    } catch (error) {
      return next(error);
    }
  };

  public getDeck = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const { id } = req.params;
    try {
      const deck = await this.deckService.getDeck(id);
      return res.status(200).json({
        deck
      });
    } catch (error) {
      return next(error);
    }
  };

  public getDecks = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const decks = await this.deckService.getDecks();
      return res.status(200).json({
        decks
      });
    } catch (error) {
      return next(error);
    }
  };

  public updateDeck = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const { id } = req.params;
    const deck = req.body;
    try {
      const updated_deck = await this.deckService.updateDeck(id, deck);
      return res.status(200).json({
        deck: updated_deck
      });
    } catch (error) {
      return next(error);
    }
  };

  public deleteDeck = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const { id } = req.params;
    try {
      const deleted_cards = await this.cardService.deleteAllCArdsByDeck(id);
      const deleted_deck = await this.deckService.deleteDeck(id);
      return res.status(200).json({
        deck: deleted_deck
      });
    } catch (error) {
      return next(error);
    }
  };

  public getDecksByUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const { userId } = req.params;
    try {
      const decks = await this.deckService.getDecksByUser(userId);
      return res.status(200).json([...decks]);
    } catch (error) {
      return next(error);
    }
  };

  public getDeckByUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const { userId } = req.params;
    try {
      const decks = await this.deckService.getDeckByUser(userId);
      return res.status(200).json({
        decks
      });
    } catch (error) {
      return next(error);
    }
  };

  public deleteAll = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const deletedCount = await this.deckService.deleteAll();
      return res.status(200).json({
        deck: deletedCount
      });
    } catch (error) {
      return next(error);
    }
  };
}
