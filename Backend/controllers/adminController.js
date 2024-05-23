import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import Admin from "../models/admin.js"; // Assuming you have an Admin model

const authAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });

  if (admin && (await admin.matchPassword(password))) {
    res.json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      isAdmin: admin.isAdmin,
      token: generateToken(admin._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const registerAdmin = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const adminExists = await Admin.findOne({ email });

  if (adminExists) {
    res.status(400);
    throw new Error("Admin already exists");
  }

  const admin = await Admin.create({
    name,
    email,
    password,
  });

  if (admin) {
    const token = generateToken(admin._id);
    res.status(201).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      isAdmin: admin.isAdmin,
      token: token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid admin data");
  }
});

const getAdminProfile = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.admin._id);

  if (admin) {
    res.json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      isAdmin: admin.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("Admin not found");
  }
});

const updateAdminProfile = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.admin._id);

  if (admin) {
    admin.name = req.body.name || admin.name;
    admin.email = req.body.email || admin.email;
    if (req.body.password) {
      admin.password = req.body.password;
    }

    const updatedAdmin = await admin.save();

    res.json({
      _id: updatedAdmin._id,
      name: updatedAdmin.name,
      email: updatedAdmin.email,
      isAdmin: updatedAdmin.isAdmin,
      token: generateToken(updatedAdmin._id),
    });
  } else {
    res.status(404);
    throw new Error("Admin not found");
  }
});

const getAdmins = asyncHandler(async (req, res) => {
  const admins = await Admin.find({});
  res.json(admins);
});

const deleteAdmin = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.params.id);

  if (admin) {
    await admin.remove();
    res.json({ message: "Admin removed" });
  } else {
    res.status(404);
    throw new Error("Admin not found");
  }
});

const getAdminById = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.params.id).select("-password");

  if (admin) {
    res.json(admin);
  } else {
    res.status(404);
    throw new Error("Admin not found");
  }
});

const updateAdmin = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.params.id);

  if (admin) {
    admin.name = req.body.name || admin.name;
    admin.email = req.body.email || admin.email;
    admin.isAdmin = req.body.isAdmin;

    const updatedAdmin = await admin.save();

    res.json({
      _id: updatedAdmin._id,
      name: updatedAdmin.name,
      email: updatedAdmin.email,
      isAdmin: updatedAdmin.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("Admin not found");
  }
});

export {
  authAdmin,
  registerAdmin,
  getAdminProfile,
  updateAdminProfile,
  getAdmins,
  deleteAdmin,
  getAdminById,
  updateAdmin,
};
