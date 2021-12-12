import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
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
    admin_cnic: {
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
    is_admin: {
      type: Boolean,
      default: true,
    },

    // * ok
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// * Bcrypt 

adminSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.admin_password)
}

adminSchema.pre('save', async function (next) {
  if (!this.isModified('admin_password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.admin_password = await bcrypt.hash(this.admin_password, salt)
})

// * ========================

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
