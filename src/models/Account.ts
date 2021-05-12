import { model, Schema, Model } from "mongoose";
import { IAccount } from "../types";

const AccountSchema: Schema = new Schema({
  identity: {
    id: { type: String, required: true, unique: true },
    subtype: { type: String, required: true },
    aliases: [
      { type: String, required: true }
    ]
  }
});

const Account: Model<IAccount> = model("Account", AccountSchema);
export default Account;
