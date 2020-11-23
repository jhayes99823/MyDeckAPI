import mongoose, { Schema } from "mongoose";
import { ISession } from "./session.interface";

export const DOCUMENT_NAME = "Session";
export const COLLECTION_NAME = "sessions";

const SessionSchema: Schema = new Schema(
  {
    players: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Player",
        },
      ],
    },
    piles: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Pile",
        },
      ],
    },
    namae: String,
  },
  {
    timestamps: true,
  }
);

export const Session = mongoose.model<ISession>(
  DOCUMENT_NAME,
  SessionSchema,
  COLLECTION_NAME
);
