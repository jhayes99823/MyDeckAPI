import { Player } from "./player.model";
import { Pile } from "../pile/pile.model";

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

  async drawCard(name: string, pileName: string, sessionId: string) {
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

    const drawnCard = pile.cards.shift();
    player.cards.push(drawnCard);

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
}
