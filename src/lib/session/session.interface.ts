import mongoose, { Document } from "mongoose";
import { IPlayer } from "../player/player.interface";
import { IPile } from "../pile/pile.interface";

export interface ISession extends Document {
  players: IPlayer[];
  piles: IPile[];
  name: string;
}

export interface CreateSessionDTO {
  playerNames: string[];
  pileNames: string[];
  deckCount: number;
  name: string;
}
