import mongoose from "mongoose";

const MONGOD_URL = process.env.MONGO_PROD_URL || "mongodb://localhost:27017/my-deck"

const connectDb = () => {
  return mongoose.connect(MONGOD_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
export { connectDb };
