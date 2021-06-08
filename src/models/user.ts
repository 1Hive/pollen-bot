import { model, Schema, Model, Document } from "mongoose";

interface IUser extends Document {
  discordId: string,
  address: string,
  username: string,
  github: string,
  discourse: string,
  modifiedAt: number,
  createdAt: number
}

const UserSchema: Schema = new Schema({
  discordId: { type: String, unique: true, required: true, dropDups: true },
  username: { type: String, unique: true, required: true, dropDups: true },
  discourse: { type: String },
  github: { type: String },
  address: { type: String, unique: true, required: true },
  modifiedAt: { type: Number },
  createdAt: { type: Number, default: Date.now() }
}, { 
  versionKey: false,
  _id: false
});

const User: Model<IUser> = model("User", UserSchema);
export default User;
