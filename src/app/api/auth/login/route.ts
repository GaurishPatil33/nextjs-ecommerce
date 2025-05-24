import { NextResponse } from 'next/server';
import { User } from '@/lib/model/User';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '@/lib/db/db';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  await connectToDatabase();

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  return NextResponse.json({ message: 'Login successful', user });
}