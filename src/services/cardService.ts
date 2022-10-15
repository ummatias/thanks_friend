import { Card } from '@prisma/client';
import prisma from '../../prisma/client';

export default class CardService {
  public createCard = async (card: Card): Promise<Card> => {
    const created_card = await prisma.card.create({
      data: {
        ...card
      }
    });
    return created_card;
  };

  public getCard = async (id: string): Promise<Card> => {
    const card = await prisma.card.findFirstOrThrow({
      where: {
        id
      }
    });
    return card;
  };

  public updateCard = async (id: string, card: Card): Promise<Card> => {
    const updated_card = await prisma.card.update({
      where: {
        id
      },
      data: {
        ...card
      }
    });
    return updated_card;
  };

  public deleteCard = async (id: string): Promise<Card> => {
    const deleted_card = await prisma.card.delete({
      where: {
        id
      }
    });
    return deleted_card;
  };

  public deleteAllCArdsByDeck = async (deckId: string) => {
    const cards = await prisma.card.findMany({
      where: {
        deckId
      }
    });
    if (cards.length > 0) {
      const deleted_cards = await prisma.card.deleteMany({
        where: {
          id: {
            in: cards.map((card) => card.id)
          }
        }
      });
      return deleted_cards;
    }
    return [];
  };

  public getCardsByDeckId = async (deckId: string): Promise<Card[]> => {
    const cards = await prisma.card.findMany({
      where: {
        deckId
      }
    });
    return cards;
  };
}
