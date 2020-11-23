import mongoose, { Document } from "mongoose";

export interface ICard extends mongoose.Types.Subdocument {
  suit: string;
  value: string;
  code: string;
  count: number;
}
