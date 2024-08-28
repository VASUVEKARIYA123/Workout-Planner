//models/Entry.js

import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
const EntrySchema = new mongoose.Schema(
    {
        date: { type: Date, required: true },
        routines: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Routine'
            }
        ],
        meals: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Meal'
            }
        ],
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
    },
    {
        timestamps: true
    }
)

EntrySchema.plugin(uniqueValidator);

export default mongoose.model("Entry", EntrySchema);
