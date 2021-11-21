import asyncHandler from "express-async-handler";
import AdminModel from "../../models/admin/admin.js";

// * @desc    Fetch all user
// * @route   GET /api/user
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

// * @desc    Fetch single user
// * @route   GET /api/user/:id
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

// * @desc    Delete a User
// * @route   DELETE /api/user/:id
// * @access  Private/Admin
const deleteAdmin = asyncHandler(async (req, res) => {
    const user = await AdminModel.findById(req.params.id);

    if (user) {
        await user.remove();
        res.json({ message: "user removed" });
    } else {
        res.status(404);
        throw new Error("user not found");
    }
});

// * @desc    Create a user
// * @route   POST /api/user
// * @access  Private/Admin
const createAdmin = asyncHandler(async (req, res) => {
    // * req.body
    const {
        // clientuserid,
        user_name,
        user_email,
        user_phone,
        user_password,
        status,
    } = req.body;

    const newAdminModel = new AdminModel({
        // clientuserid,
        user_name,
        user_email,
        user_phone,
        user_password,
        status,
    });

    const saveAdmin = await newAdminModel.save();
    res.status(201).json(saveAdmin);
});

export { getAdmin, getAdminById, createAdmin, deleteAdmin };