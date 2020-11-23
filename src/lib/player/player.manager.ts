import { Player } from "./player.model";

export default class PlayerManager {
  private static _theInstance: PlayerManager = null as any;

  static getInstance(): PlayerManager {
    if (PlayerManager._theInstance) return PlayerManager._theInstance;

    PlayerManager._theInstance = new PlayerManager();

    return PlayerManager._theInstance;
  }

  private constructor() {}

  async getPlayerBySessionidandName(name: string, sessionId: string) {
    const player = await Player.find({
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
        ...player,
      },
    };
  }
}
