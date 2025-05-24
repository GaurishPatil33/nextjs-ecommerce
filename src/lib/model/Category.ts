import { model, models, Schema } from "mongoose";


const CategorySchema = new Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    image: { type: String }
})

export default models.Category || model('Category', CategorySchema); 