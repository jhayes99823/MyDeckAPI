import { Session } from "./session.model";
import { CreateSessionDTO } from "./session.interface";
import { Player } from "../player/player.model";
import { Pile } from "../pile/pile.model";
import { suits, cardValues } from "../card/card.model";

const DECK_COUNT = 52;
const IMAGE_URL_BASE = "https://deckofcardsapi.com/static/img/";

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
    let cardCounter = DECK_COUNT;

    let playerCardCount = dto.playerHandCount;
    const cardDeck = this.createCardDeck();

    for (let player in dto.playerNames) {
      const newPlayer = new Player({ name: dto.playerNames[player].name });

      playerCardCount = dto.playerHandCount;

      if (dto.playerNames[player].handCount) {
        playerCardCount = dto.playerNames[player].handCount;
      }

      if (playerCardCount == null) {
        playerCardCount = 4;
      }

      while (playerCardCount > 0) {
        let randomInt = this.getRandomInt(cardCounter);
        newPlayer.cards.push(cardDeck[randomInt]);
        cardCounter--;
        playerCardCount--;
        cardDeck.splice(randomInt, 1);
      }

      newPlayer.sessionId = session.id;

      newPlayer.save();

      session.players.push(newPlayer.id);
    }

    for (let pile in dto.pileNames) {
      const newPile = new Pile({ name: dto.pileNames[pile].name });

      if (dto.pileNames[pile].count === "remaining") {
        while (cardCounter > 0) {
          let randomInt = this.getRandomInt(cardCounter);
          newPile.cards.push(cardDeck[randomInt]);
          cardCounter--;
          cardDeck.splice(randomInt, 1);
        }
      }

      newPile.sessionId = session.id;

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
        pile_ids: session.piles,
        player_ids: session.players,
      },
    };
  }

  createCardDeck() {
    const cardArr = [];

    for (let suit in suits) {
      for (let value in cardValues) {
        const code =
          suits[suit].charAt(0) +
          (cardValues[value].length > 1
            ? cardValues[value].charAt(0)
            : cardValues[value]);
        const newCard = {
          suit: suits[suit],
          value: cardValues[value],
          code,
          imageURL:
            IMAGE_URL_BASE +
            (code.charAt(1) == "1" ? "0" : code.charAt(1)) +
            code.charAt(0) +
            ".png",
        };
        cardArr.push(newCard);
      }
    }

    return cardArr;
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
}
