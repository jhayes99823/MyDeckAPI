import mongoose, { Document } from "mongoose";
import { ICard } from "../card/card.interface";

export interface IPlayer extends Document {
  cards: ICard[];
  name: string;
}
