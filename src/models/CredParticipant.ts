import { model, Schema, Model } from "mongoose";
import { ICredParticipant } from "../types";

const CredParticipantSchema: Schema = new Schema({
  credPerInterval: { type: Array, required: true },
  cred: { type: Number, required: true },
  id: { type: String, unique: true, required: true }
});

const CredParticipant: Model<ICredParticipant> = model("CredParticipant", CredParticipantSchema);
export default CredParticipant;
