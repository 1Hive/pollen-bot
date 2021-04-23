import * as mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  discordId: { type : String , unique : true, required : true, dropDups : true},
  address: { type:String },
  username: { type:String },
  github: { type:String },
  discourse: { type:String },
}, { 
  versionKey: false 
});

export default mongoose.model("User", UserSchema);
