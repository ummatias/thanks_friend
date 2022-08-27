import prisma from '../prisma/client';
import { Deck } from '@prisma/client';

export default class DeckService {
  public createDeck = async (deck: Deck) => {
    console.log('deck', deck);
    const created_deck = await prisma.deck.create({
      data: {
        ...deck
      }
    });

    return created_deck;
  };

  public getDeck = async (id: string) => {
    const deck = await prisma.deck.findFirstOrThrow({
      where: {
        id
      }
    });
    return deck;
  };

  public getDecks = async () => {
    const decks = await prisma.deck.findMany();
    return decks;
  };

  public updateDeck = async (id: string, deck: Deck) => {
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

  public deleteDeck = async (id: string) => {
    const deleted_deck = await prisma.deck.delete({
      where: {
        id
      }
    });
    return deleted_deck;
  };

  public getDeckByUser = async (userId: string) => {
    const decks = await prisma.deck.findMany({
      where: {
        userId
      }
    });
    return decks;
  };
}
