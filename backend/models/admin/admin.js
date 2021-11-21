import mongoose from "mongoose";

const Schema = mongoose.Schema;

const adminSchema = new mongoose.Schema(
  {
    // * ok
    admin_first_name: {
      type: String,
      required: true,
    },

    // * ok
    admin_last_name: {
      type: String,
      required: true,
    },

    // * ok
    admin_email: {
      type: String,
      required: true,
    },

    // * ok
    admin_phone: {
      type: String,
      required: true,
    },

    // * ok
    admin_password: {
      type: String,
      required: true,
    },

    // * ok
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
