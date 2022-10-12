import { Deck } from '@prisma/client';
import prisma from '../prisma/client';

export default class DeckService {
  public createDeck = async (deck: Deck): Promise<Deck> => {
    const created_deck = await prisma.deck.create({
      data: {
        ...deck
      }
    });

    return created_deck;
  };

  public getDeck = async (id: string): Promise<Deck> => {
    const deck = await prisma.deck.findFirstOrThrow({
      where: {
        id
      }
    });
    return deck;
  };

  public getDecks = async (): Promise<Deck[]> => {
    const decks = await prisma.deck.findMany();
    return decks;
  };

  public updateDeck = async (id: string, deck: Deck): Promise<Deck> => {
    const updated_deck = await prisma.deck.update({
      where: {
        id
      },
      data: {
        ...deck
      }
    });
    return updated_deck;
  };

  public deleteDeck = async (id: string): Promise<Deck> => {
    const deleted_deck = await prisma.deck.delete({
      where: {
        id
      }
    });
    return deleted_deck;
  };

  public getDecksByUser = async (userId: string): Promise<Deck[]> => {
    const decks = await prisma.deck.findMany({
      where: {
        userId
      }
    });
    return decks;
  };

  public getDecksPublic = async (): Promise<Deck[]> => {
    const decks = await prisma.deck.findMany({
      where: {
        public: true
      }
    });
    return decks;
  };

  public getDeckPublic = async (id: string): Promise<Deck> => {
    const deck = await prisma.deck.findFirstOrThrow({
      where: {
        id,
        public: true
      }
    });
    return deck;
  };
}
