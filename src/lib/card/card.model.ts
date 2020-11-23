import mongoose, { Schema } from "mongoose";
import { ICard } from "./card.interface";

export const DOCUMENT_NAME = "Card";
export const COLLECTION_NAME = "cards";

export const suits = ["CLUB", "DIAMOND", "HEART", "SPADE"];
export const cardValues = [
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
    imageURL: String,
  },
  {
    timestamps: true,
  }
);

export default CardSchema;
