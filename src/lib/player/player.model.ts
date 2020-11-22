import mongoose, { Schema } from "mongoose";
import { IPlayer } from "./player.interface";

export const DOCUMENT_NAME = "Player";
export const COLLECTION_NAME = "players";

const PlayerSchema: Schema = new Schema(
  {
    name: String,
    cards: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Card",
        },
      ],
    },
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
