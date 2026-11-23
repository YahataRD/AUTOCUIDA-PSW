import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema.Types;
const options = { strict: "throw" };

export const maintenanceItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  intervalKm: { type: Number, required: true },
  intervalMonths: { type: Number, required: true },
  active: { type: Boolean, required: true },
  initialReference: {
    date: { type: String, required: true },
    km: { type: Number, required: true },
  },
}, options);

export const serviceRecordSchema = new mongoose.Schema({
  maintenanceItemId: { type: ObjectId, required: true },
  itemName: { type: String, required: true },
  maintenanceType: { type: String, required: true },
  serviceDate: { type: String, required: true },
  serviceKm: { type: Number, required: true },
  amount: { type: Number, required: true },
  shop: { type: String, required: true },
}, options);
