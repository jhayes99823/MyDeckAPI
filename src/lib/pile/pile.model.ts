import mongoose, { Schema } from "mongoose";
import { IPile } from "./pile.interface";
import CardSchema from "../card/card.model";

export const DOCUMENT_NAME = "Pile";
export const COLLECTION_NAME = "piles";

const PileSchema: Schema = new Schema(
  {
    name: String,
    cards: [CardSchema],
    sessionId: String,
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
