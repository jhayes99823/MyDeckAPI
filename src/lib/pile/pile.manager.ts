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
    const pile = await Pile.find({ sessionId: sessionId, name: name }).exec();

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
        ...pile,
      },
    };
  }
}
