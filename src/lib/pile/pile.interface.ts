import mongoose, { Document } from "mongoose";
import { ICard } from "../card/card.interface";

export interface IPile extends Document {
  cards: ICard[];
  name: string;
}
