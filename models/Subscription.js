import mongoose from "mongoose";
const subscriptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name is required']
  },
  price: {
    type: Number,
    required: [true, 'the price is required'],
    min: [0, 'the price most be positive'],
    trim: true
  },
  billingCycle: {
    type: String,
    enum: ["monthly", "yearly"],
    required: [true, "Billing cycle is required"],
  },

  createdAt: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
})

const Subscription = mongoose.model('Subscription', subscriptionSchema);
export { Subscription }