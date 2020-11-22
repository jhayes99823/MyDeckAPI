import mongoose from "mongoose";

const connectDb = () => {
  return mongoose.connect("mongodb://localhost:27017/my-deck", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
export { connectDb };
