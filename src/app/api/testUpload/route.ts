
import { connectToDatabase } from '@/lib/db/db';
import Upload1 from '@/lib/model/testUpload';



export async function GET() {
  await connectToDatabase();
  const upload = await Upload1.find({});
  return Response.json(upload);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    await connectToDatabase();

    const newUpload = await Upload1.create(body);
    return Response.json(newUpload, { status: 201 });
  } catch (err) {
    console.error("Error in POST /api/testUpload:", err);
    return Response.json({ error: err }, { status: 500 });
  }
}

