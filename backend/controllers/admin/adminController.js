import asyncHandler from "express-async-handler";
import generateToken from '../../configs/jwt/generateToken.js'
import AdminModel from "../../models/admin/admin.js";

// * =================================================================================

// * @desc    Fetch all admin
// * @route   GET /api/admin
// * @access  Public
const getAdmin = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const count = await AdminModel.countDocuments({});
  const user = await AdminModel.find({})
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ user, page, pages: Math.ceil(count / pageSize) });
});

// * =================================================================================

// * @desc    Fetch single admin
// * @route   GET /api/admin/:id
// * @access  Public
const getAdminById = asyncHandler(async (req, res) => {
  const user = await AdminModel.findById(req.params.id);

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("user not found");
  }
});

// * =================================================================================

// * @desc    Delete a admin
// * @route   DELETE /api/admin/:id
// * @access  Private/Admin
const deleteAdmin = asyncHandler(async (req, res) => {
  const admin = await AdminModel.findById(req.params.id);

  if (admin) {
    await admin.remove();
    res.json({ message: "admin removed" });
  } else {
    res.status(404);
    throw new Error("admin not found");
  }
});

// * =================================================================================

// * @desc    Create an admin
// * @route   POST /api/admin
// * @access  Private/Admin
const createAdmin = asyncHandler(async (req, res) => {

  // * required array
  let required = [];

  if (!req.body.admin_first_name)
    required.push("admin_first_name");
  if (!req.body.admin_last_name)
    required.push("admin_last_name");
  if (!req.body.admin_phone)
    required.push("admin_phone");
  if (!req.body.admin_email)
    required.push("admin_email");
  if (!req.body.admin_password)
    required.push("admin_password");

  // * check required fields !
  if (required.length === 0) {

    // * req.body
    const {
      admin_first_name,
      admin_last_name,
      admin_phone,
      admin_email,
      admin_password,
      status,
    } = req.body;

    const newAdminModel = new AdminModel({
      admin_first_name,
      admin_last_name,
      admin_phone,
      admin_email,
      admin_password,
      status,
    });

    const saveAdmin = await newAdminModel.save();
    res.status(201).json({
      status: "success",
      response: saveAdmin,
      message: "Admin Created Succesfully !"
    });

  } else {
    // * mapping the required array list
    let message = required.map((item) => {
      return " " + item;
    });
    res.json({
      status: "fail",
      message: "Following fields are required - " + message,
      response: [],
    });
  }
});

// * =================================================================================

// * @desc    Auth admin & get token
// * @route   POST /api/admin/login
// * @access  Public
const authAdmin = asyncHandler(async (req, res) => {

  // * required array
  let required = [];

  if (!req.body.admin_cnic)
    required.push("admin_cnic");
  if (!req.body.admin_password)
    required.push("admin_password");

  // * check required fields !
  if (required.length === 0) {

    console.log(req.body)

    const { admin_cnic, admin_password } = req.body

    const admin = await AdminModel.findOne({ admin_cnic, admin_password })

    if (admin) {
      res.json({
        status: "success",
        response: {
          _id: admin._id,
          admin_first_name: admin.admin_first_name,
          admin_last_name: admin.admin_last_name,
          admin_email: admin.admin_email,
          admin_cnic: admin.admin_cnic,
          is_admin: true,
          is_teacher: false,
          token: generateToken(admin._id),
        },
        message: "Authentication Succesfull"
      })
    } else {
      res.status(401).json({
        status: "fail",
        response: null,
        message: "Invalid cnic or password"
      })
    }
  } else {
    // * mapping the required array list
    let message = required.map((item) => {
      return " " + item;
    });
    res.json({
      status: "fail",
      message: "Following fields are required - " + message,
      response: [],
    });
  }
})

// * =================================================================================

export { getAdmin, getAdminById, createAdmin, deleteAdmin, authAdmin };
