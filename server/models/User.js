//models/User.js

import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
const UserSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        profilePicture: { type: String, default: "" },
        routines: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Routine'
            }
        ],
        entries: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Entry'
            }
        ],
        meals: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Meal'
            }
        ],
    },
    {
        timestamps: true
    }
)
UserSchema.plugin(uniqueValidator);
export default mongoose.model("User", UserSchema);
