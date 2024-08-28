//models/Routine.js

import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const RoutineSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', required: true
        },
        workout_type: { type: String, required: true },
        body_part: { type: String, required: true },
        link: { type: String }
    },
    {
        timestamps: true
    }
)

RoutineSchema.plugin(uniqueValidator, { message: "is already taken" });
export default mongoose.model("Routine", RoutineSchema);
