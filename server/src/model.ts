import mongoose, { Schema, Document } from "mongoose";

export interface IPayment extends Document {
  paymentID: string;
  trxID: string;
  amount: number;
  invoiceID: string;
  status: string;
  createdAt: Date;
}

const paymentSchema = new Schema<IPayment>({
  paymentID: { type: String, required: true },
  trxID: { type: String, required: false },
  amount: { type: Number, required: true },
  invoiceID: { type: String, required: true },
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

const Payment = mongoose.model<IPayment>("Payment", paymentSchema);
export default Payment;
