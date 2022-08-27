import prisma from '../prisma/client';
import { Card } from '@prisma/client';

export default class CardService {
  public createCard = async (card: Card) => {
    const created_card = await prisma.card.create({
      data: {
        ...card
      }
    });
    return created_card;
  };

  public getCard = async (id: string) => {
    const card = await prisma.card.findFirstOrThrow({
      where: {
        id
      }
    });
    return card;
  };

  public getCards = async () => {
    const cards = await prisma.card.findMany();
    return cards;
  };

  public updateCard = async (id: string, card: Card) => {
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

  public deleteCard = async (id: string) => {
    const deleted_card = await prisma.card.delete({
      where: {
        id
      }
    });
    return deleted_card;
  };

  public getCardsByDeckId = async (deckId: string) => {
    const cards = await prisma.card.findMany({
      where: {
        Deck: {
          id: deckId
        }
      }
    });
    return cards;
  };
}
