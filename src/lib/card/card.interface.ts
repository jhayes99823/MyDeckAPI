import mongoose, { Document } from "mongoose";

export interface ICard extends Document {
  suit: string;
  value: string;
  code: string;
  count: number;
}
