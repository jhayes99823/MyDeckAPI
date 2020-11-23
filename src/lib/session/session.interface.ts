import mongoose, { Document } from "mongoose";
import { IPlayer } from "../player/player.interface";
import { IPile } from "../pile/pile.interface";

export interface ISession extends Document {
  players: IPlayer[];
  piles: IPile[];
  name: string;
}

export interface NewPlayerDTO {
  name: string;
  handCount?: number;
}

export interface NewPileDTO {
  name: string;
  count?: string;
}

export interface CreateSessionDTO {
  playerNames: NewPlayerDTO[];
  pileNames: NewPileDTO[];
  deckCount: number;
  name: string;
  playerHandCount: number;
}
