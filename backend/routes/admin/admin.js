import express from "express";
const router = express.Router();

// * =======================================================================================//

import {
  getAdmin,
  getAdminById,
  createAdmin,
  deleteAdmin,
  authAdmin
} from "../../controllers/admin/adminController.js";

// *=======================================================================================//

router.route("/admin").post(createAdmin);

// * =======================================================================================//

router.route("/admin").get(getAdmin);

// *=======================================================================================//

router.route("/admin/login").post(authAdmin);

// *=======================================================================================//

router.route("/admin/:id").delete(deleteAdmin);

// *=======================================================================================//

export default router;
