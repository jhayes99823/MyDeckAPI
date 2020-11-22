import mongoose, { Schema } from "mongoose";
import { IPile } from "./pile.interface";

export const DOCUMENT_NAME = "Pile";
export const COLLECTION_NAME = "piles";

const PileSchema: Schema = new Schema(
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

export const Pile = mongoose.model<IPile>(
  DOCUMENT_NAME,
  PileSchema,
  COLLECTION_NAME
);
