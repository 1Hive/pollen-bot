import { model, Schema, Model, Document } from "mongoose";

interface IUser extends Document {
  discordId: string,
  address: string,
  username: string,
  github: string,
  discourse: string
}

const UserSchema: Schema = new Schema({
  discordId: { type : String , unique: true, required: true, dropDups: true },
  address: { type: String },
  username: { type: String },
  github: { type: String },
  discourse: { type: String }
}, { 
  versionKey: false 
});

const User: Model<IUser> = model("User", UserSchema);
export default User;
