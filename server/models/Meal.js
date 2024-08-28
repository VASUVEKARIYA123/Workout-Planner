//models/Meal.js

import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const MealSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', required: true
        },
        recipe: { type: String, default: "" },
        time: { type: Number, required: true },
        description: { type: String },
        category: { type: String, required: true }
    },
    {
        timestamps: true
    }
)

// Add the unique validator plugin to the schema
MealSchema.plugin(uniqueValidator);

export default mongoose.model("Meal", MealSchema);
