import mongoose from "mongoose";

const TransactionSchema = mongoose.Schema(
  {
    order_id: { type: String, required: true, unique: true },
    payment_id: { type: String },
    razorpay_signature: { type: String },
    userEmail: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    contact: String,
    status: { type: String, required: true },
    method: String,
    amountInPaise: { type: Number, required: true },
    premiumSubscriptionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "premiumsubscription",
      required: true,
    },
    premiumSubscriptionName: { type: String, required: true },
    payload: String,
    expiresOn: Date,
    expireDateString: String,
    expired: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const PaymentTransaction = mongoose.model(
  "payment_transaction",
  TransactionSchema
);

export default PaymentTransaction;
