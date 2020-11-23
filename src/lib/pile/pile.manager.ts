import { Pile } from "./pile.model";

export default class PileManager {
  private static _theInstance: PileManager = null as any;

  static getInstance(): PileManager {
    if (PileManager._theInstance) return PileManager._theInstance;

    PileManager._theInstance = new PileManager();

    return PileManager._theInstance;
  }

  private constructor() {}

  async getPileInfoBySessionIdandName(name: string, sessionId: string) {
    const pile = await Pile.findOne({
      sessionId: sessionId,
      name: name,
    }).exec();

    if (!pile) {
      return {
        success: false,
        message: "Pile Not Found",
        statusCode: 400,
      };
    }

    return {
      success: true,
      message: "Pile Found",
      statusCode: 200,
      data: {
        id: pile.id,
        name: pile.name,
        cards: pile.cards,
        sessionId: pile.sessionId,
      },
    };
  }

  async shufflePileToPile(to: string, from: string, sessionId: string) {
    const toPile = await Pile.findOne({
      sessionId: sessionId,
      name: to,
    }).exec();

    if (!toPile) {
      return {
        success: false,
        message: "Pile One Not Found",
        statusCode: 400,
      };
    }

    const fromPile = await Pile.findOne({
      sessionId: sessionId,
      name: from,
    }).exec();

    if (!fromPile) {
      return {
        success: false,
        message: "Pile Two Not Found",
        statusCode: 400,
      };
    }

    let cardCount = fromPile.cards.length;

    while (cardCount > 0) {
      let randomInt = this.getRandomInt(cardCount);
      let randCard = fromPile.cards[randomInt];

      toPile.cards.push(randCard);
      fromPile.cards.splice(randomInt, 1);

      cardCount--;
    }

    toPile.save();
    fromPile.save();

    return {
      success: true,
      message: "Piles Shuffled and Transferred",
      statusCode: 200,
    };
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
}
