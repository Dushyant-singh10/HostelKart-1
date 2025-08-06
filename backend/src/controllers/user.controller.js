import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

//signup controller
export const signup = async (req, res) => {
  const { name, email, password, hostelName, roomNumber } = req.body;
  if (!name || !email || !password || !hostelName || !roomNumber) {
    return res.status(400).json({ message: "All fields are required" });
  }

  //encrypt password
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        hostelName,
        roomNumber,
      },
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error registering user" });
  }
};

//login controller
export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error logging in" });
  }
  try {
    if (!(await bcrypt.compare(password, User.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).json({
      token,
      user: {
        name: user.name,
        email: user.email,
        hostelName: user.hostelName,
        roomNumber: user.roomNumber,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Error logging in" });
  }
};

// GET /api/users/profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ message: "Error fetching profile" });
  }
};

// GET /api/users/items
export const getMyItems = async (req, res) => {
  try {
    const items = await items.find({ owner: req.user.id });
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: "Could not fetch your items" });
  }
};
