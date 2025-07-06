import { v2 as cloudinary } from 'cloudinary'

if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    throw new Error("Missing required Cloudinary environment variables");
}


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: Request) {
    const { paramsToSign } = await req.json()

    if (!paramsToSign) {
        return new Response("missing params", { status: 400 })
    }
    const signature = cloudinary.utils.api_sign_request(
        paramsToSign, process.env.CLOUDINARY_API_SECRET!
    )
    return Response.json({ signature })
}

export async function DELETE(req: Request) {
    const { public_id } = await req.json()

    if (!public_id) {
        return new Response("missing public_id", { status: 400 })
    }
    try {
        const res = await cloudinary.uploader.destroy(public_id)
        return Response.json({ res })
    } catch (err) {
        console.error("Cloudinary delete error : ", err)
        return new Response("failed to delete", { status: 400 })
    }
}