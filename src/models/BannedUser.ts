import * as mongoose from "mongoose";

const BannedUserSchema = new mongoose.Schema({
  discordId: { type: String , unique: true, required: true },
  username: { type: String , unique: true, required: true },
});

export default mongoose.model("BannedUser", BannedUserSchema);
