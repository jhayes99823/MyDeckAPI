import { Player } from "./player.model";
import { Pile } from "../pile/pile.model";
import { ICard } from "../card/card.interface";

export default class PlayerManager {
  private static _theInstance: PlayerManager = null as any;

  static getInstance(): PlayerManager {
    if (PlayerManager._theInstance) return PlayerManager._theInstance;

    PlayerManager._theInstance = new PlayerManager();

    return PlayerManager._theInstance;
  }

  private constructor() {}

  async getPlayerBySessionidandName(name: string, sessionId: string) {
    const player = await Player.findOne({
      sessionId: sessionId,
      name: name,
    }).exec();

    if (!player) {
      return {
        success: false,
        message: "Player Not Found",
        statusCode: 400,
      };
    }

    return {
      success: true,
      message: "Player Found",
      statusCode: 200,
      data: {
        id: player.id,
        name: player.name,
        cards: player.cards,
        sessionId: player.sessionId,
      },
    };
  }

  async draw(
    name: string,
    pileName: string,
    sessionId: string,
    amount: number
  ) {
    const player = await Player.findOne({
      sessionId: sessionId,
      name: name,
    }).exec();

    if (!player) {
      return {
        success: false,
        message: "Player Not Found",
        statusCode: 400,
      };
    }

    const pile = await Pile.findOne({
      sessionId: sessionId,
      name: pileName,
    }).exec();

    if (!pile) {
      return {
        success: false,
        message: "Pile Not Found",
        statusCode: 400,
      };
    }

    if (amount == null || amount == undefined) {
      amount = 1;
    }

    while (amount > 0) {
      const drawnCard = pile.cards.shift();
      player.cards.push(drawnCard);
      amount--;
    }

    pile.save();
    player.save();

    return {
      success: true,
      message: "Player Card Drawn",
      statusCode: 200,
      data: {
        id: player.id,
        name: player.name,
        cards: player.cards,
        sessionId: player.sessionId,
      },
    };
  }

  async discard(
    name: string,
    pileName: string,
    sessionId: string,
    cards: ICard[]
  ) {
    const player = await Player.findOne({
      sessionId: sessionId,
      name: name,
    }).exec();

    if (!player) {
      return {
        success: false,
        message: "Player Not Found",
        statusCode: 400,
      };
    }

    const pile = await Pile.findOne({
      sessionId: sessionId,
      name: pileName,
    }).exec();

    if (!pile) {
      return {
        success: false,
        message: "Pile Not Found",
        statusCode: 400,
      };
    }

    const foundCards = [];

    for (let card in cards) {
      const currCard = cards[card];
      foundCards.push(
        player.cards.findIndex((element) => {
          return (
            element.code == currCard.code &&
            element.value == currCard.value &&
            element.suit == currCard.suit
          );
        })
      );
    }

    console.log("found cars", foundCards);

    while (foundCards.length > 0) {
      const cardToRemove = player.cards[foundCards[0]];
      console.log("my card", cardToRemove);
      pile.cards.push(cardToRemove);
      player.cards.splice(foundCards[0], 1);
      foundCards.shift();
    }

    pile.save();
    player.save();

    // return "im here";
    return {
      success: true,
      message: "Player Card Drawn",
      statusCode: 200,
      data: {
        id: player.id,
        name: player.name,
        cards: player.cards,
        sessionId: player.sessionId,
      },
    };
  }
}
