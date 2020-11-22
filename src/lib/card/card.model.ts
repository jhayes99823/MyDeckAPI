import mongoose, { Schema } from "mongoose";
import { ICard } from "./card.interface";

export const DOCUMENT_NAME = "Card";
export const COLLECTION_NAME = "cards";

const suits = ["CLUB", "DIAMOND", "HEART", "SPADE"];
const cardValues = [
  "ACE",
  "KING",
  "QUEEN",
  "JACK",
  "10",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
  "1",
];

const CardSchema: Schema = new Schema(
  {
    suit: {
      type: String,
      enum: [...suits],
    },
    value: {
      type: String,
      enum: [...cardValues],
    },
    code: String,
    count: Number,
  },
  {
    timestamps: true,
  }
);

export const Card = mongoose.model<ICard>(
  DOCUMENT_NAME,
  CardSchema,
  COLLECTION_NAME
);
