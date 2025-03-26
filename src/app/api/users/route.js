import { connectToDB } from "../../../lib/mongodb";
import User from "../../../models/User";
import { NextResponse } from "next/server";
import axios from "axios";

// GET ALL USERS
export async function GET() {
  try {
    console.log(" Connecting to MongoDB...");
    await connectToDB();

    console.log(" Fetching users...");
    const users = await User.find({ isDeleted: false });

    console.log(" Users fetched successfully.");
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error(" Error fetching users:", error.message);
    return NextResponse.json({ message: "Error fetching users", error: error.message }, { status: 500 });
  }
}

// CREATE USER
export async function POST(req) {
  try {
    await connectToDB();
    const { name, email } = await req.json();

    const newUser = new User({ name, email });
    await newUser.save();

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error creating user", error: error.message }, { status: 500 });
  }
}

// UPDATE USER
export async function PUT(req) {
  try {
    await connectToDB();
    const { id, name, email } = await req.json();

    const updatedUser = await User.findByIdAndUpdate(id, { name, email }, { new: true });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error updating user", error: error.message }, { status: 500 });
  }
}

// SOFT DELETE USER
export async function DELETE(req) {
  try {
    await connectToDB();
    const { id } = await req.json();

    await User.findByIdAndUpdate(id, { isDeleted: true });

    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting user", error: error.message }, { status: 500 });
  }
}
