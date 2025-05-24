import mongoose, { Schema, models } from "mongoose";


const userSchema = new Schema({
  name: { type: String },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  role: { type: String, default: 'customer' },
  address: [{ type: Schema.Types.ObjectId, ref: 'Address' }]
}, {
  timestamps: true
})

// export default models.User || mongoose.model("User", userSchema)
export const User = models.User || mongoose.model("User", userSchema)



const addressSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  fullName: { type: String },
  address: { type: String },
  city: { type: String },
  postalCode: { type: String },
  Country: { type: String },
})

export const Address = models.Address || mongoose.model("Address", addressSchema)