import { NextFunction, Request, Response } from 'express';
import CardService from '../services/cardService';
import DeckService from '../services/deckService';

export default class CardController {
  private deckService = new DeckService();
  private cardService = new CardService();

  public createCard = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const card = req.body;
    try {
      const created_card = await this.cardService.createCard(card);
      return res.status(201).json({
        card: created_card
      });
    } catch (error) {
      return next(error);
    }
  };

  public getCard = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const { id } = req.params;
    try {
      const card = await this.cardService.getCard(id);
      return res.status(200).json({
        card
      });
    } catch (error) {
      return next(error);
    }
  };

  public getCards = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const cards = await this.cardService.getCards();
      return res.status(200).json({
        cards
      });
    } catch (error) {
      return next(error);
    }
  };

  public updateCard = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const { id } = req.params;
    const card = req.body;
    try {
      const updated_card = await this.cardService.updateCard(id, card);
      return res.status(200).json({
        card: updated_card
      });
    } catch (error) {
      return next(error);
    }
  };

  public deleteCard = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const { id } = req.params;
    try {
      const deleted_card = await this.cardService.deleteCard(id);
      return res.status(200).json({
        card: deleted_card
      });
    } catch (error) {
      return next(error);
    }
  };

  public getCardsByDeck = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const { deckId } = req.params;
    try {
      const cards = await this.cardService.getCardsByDeckId(deckId);
      return res.status(200).json({
        cards
      });
    } catch (error) {
      return next(error);
    }
  };

  public getCardsByDeckPublic = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const { deckId } = req.params;
    console.log(deckId);
    try {
      const deck = await this.deckService.getDeck(deckId);
      if (deck.public) {
        const cards = await this.cardService.getCardsByDeckId(deckId);
        return res.status(200).json({
          cards
        });
      } else {
        return res.status(401).json({
          message: 'Unauthorized'
        });
      }
    } catch (error) {
      return next(error);
    }
  };
}
