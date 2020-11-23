import mongoose, { Schema } from "mongoose";
import { IPlayer } from "./player.interface";
import CardSchema from "../card/card.model";

export const DOCUMENT_NAME = "Player";
export const COLLECTION_NAME = "players";

const PlayerSchema: Schema = new Schema(
  {
    name: String,
    cards: [CardSchema],
    sessionId: String,
  },
  {
    timestamps: true,
  }
);

export const Player = mongoose.model<IPlayer>(
  DOCUMENT_NAME,
  PlayerSchema,
  COLLECTION_NAME
);
