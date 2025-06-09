import { model, models, Schema } from "mongoose";

const uploadSchema = new Schema({
    title: { type: String, required: true },
    media: [
        {
            url: { type: String, required: true },
            public_id: { type: String, default: '' },
            type: { type: String, enum: ['image', 'video', 'youtube'], required: true },
        },
    ],
});
export default models.Upload1 || model("Upload1", uploadSchema)