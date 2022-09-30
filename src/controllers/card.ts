import { Request, Response, NextFunction } from 'express';
import CardService from '../services/cardService';

export default class CardController {
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
    const { id } = req.params;
    try {
      const cards = await this.cardService.getCardsByDeckId(id);
      return res.status(200).json({
        cards
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
      const deleted_cards = await this.cardService.deleteAll();
      return res.status(200).json({
        cards: deleted_cards
      });
    } catch (error) {
      return next(error);
    }
  };
}
