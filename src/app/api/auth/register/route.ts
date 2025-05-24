import { NextResponse } from 'next/server';
import { User } from '@/lib/model/User';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '@/lib/db/db';

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  await connectToDatabase();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ name, email, password: hashedPassword });

  return NextResponse.json({ message: 'User created', user: newUser });
}
