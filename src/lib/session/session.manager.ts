import { Session } from "./session.model";
import { CreateSessionDTO } from "./session.interface";
import { Player } from "../player/player.model";
import { Pile } from "../pile/pile.model";

export default class SessionManager {
  private static _theInstance: SessionManager = null as any;

  static getInstance(): SessionManager {
    if (SessionManager._theInstance) return SessionManager._theInstance;

    SessionManager._theInstance = new SessionManager();

    return SessionManager._theInstance;
  }

  private constructor() {}

  async CreateSession(dto: CreateSessionDTO) {
    const session = new Session({ name: dto.name });

    for (let player in dto.playerNames) {
      const newPlayer = new Player({ name: dto.playerNames[player] });

      newPlayer.save();

      session.players.push(newPlayer.id);
    }

    for (let pile in dto.pileNames) {
      const newPile = new Pile({ name: dto.pileNames[pile] });

      newPile.save();

      session.piles.push(newPile.id);
    }

    session.save();

    return {
      success: true,
      message: "New Session Created",
      statusCode: 201,
      data: {
        id: session.id,
        name: session.name,
        piles: dto.pileNames,
        players: dto.playerNames,
      },
    };
  }
}
