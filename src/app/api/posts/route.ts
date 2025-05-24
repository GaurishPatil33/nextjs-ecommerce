// pages/api/posts.js
import { connectToDatabase } from '@/lib/db/db';
import Post from '@/lib/model/Post';



export async function GET() {
  await connectToDatabase();
  const posts = await Post.find({});
  return Response.json(posts);
}

export async function POST(req:Request) {
  const body = await req.json();
  const { title, content } = body;
  await connectToDatabase();
  const newPost = await Post.create({ title, content });
  return Response.json(newPost, { status: 201 });
}
