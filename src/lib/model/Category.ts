import { model, models, Schema } from "mongoose";


const CategorySchema = new Schema({
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String },

    media: [
        {
            url: { type: String, required: true },
            public_id: { type: String, default: '' },
            type: { type: String, enum: ['image'], required: true },
        },
    ],
    parentId: {
        type: String,
        ref: "Category",
        default: null
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })

export default models.Category || model('Category', CategorySchema); 