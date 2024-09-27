import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  title: String,
  image: String,
  price: Number,
  description: String,
  email: String,
});

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const ItemModel = mongoose?.models?.Item || mongoose.model("Item", ItemSchema);
const UserModel = mongoose?.models?.User || mongoose.model("User", UserSchema);

export { ItemModel, UserModel };
