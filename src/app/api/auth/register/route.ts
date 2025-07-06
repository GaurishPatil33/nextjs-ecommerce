import { NextResponse } from 'next/server';
import { User } from '@/lib/model/User';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '@/lib/db/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, password, phone } = body;

    if (!firstName || !lastName || !email || !password || !phone) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    await connectToDatabase();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
    });

    // Don't return password to client
    const userWithoutPassword = {
      _id: newUser._id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      phone: newUser.phone,
    };

    return NextResponse.json({ message: "User created", user: userWithoutPassword }, { status: 201 });
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

