import { model, Schema, Model } from "mongoose";
import { IBannedUser } from "../types"


const BannedUserSchema: Schema = new Schema({
  discordId: { type: String , unique: true, required: true },
  username: { type: String , unique: true, required: true },
});

const BannedUser: Model<IBannedUser> = model("BannedUser", BannedUserSchema);
export default BannedUser;
