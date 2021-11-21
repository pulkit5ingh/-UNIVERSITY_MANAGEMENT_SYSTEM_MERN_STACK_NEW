import express from "express";
const router = express.Router();

// * import routes

import Admin from "./routes/admin/admin.js";

// * Menu Setup
router.use("/", Admin);

// // * Category
// router.use("/", Category);

// // * User
// router.use("/", User);

// // * Cart
// router.use("/", Cart);

// * DELETE ALL
// router.use("/", require("./routes/delete/client_user_delete_all"));

export default router;