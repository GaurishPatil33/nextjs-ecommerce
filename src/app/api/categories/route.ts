import { connectToDatabase } from "@/lib/db/db";
import Category from "@/lib/model/Category"

export async function GET(req: Request) {
    await connectToDatabase();
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")
    try {
        if (id) {
            const products = await Category.findById(id)
            return Response.json(products)

        } else {
            const products = await Category.find()
            return Response.json(products)
        }
    } catch (err) {
        console.log(err)
        return Response.json({ err: "Error fetching" }, { status: 500 })
    }
}

export async function POST(req: Request) {
    const body = await req.json();
    // const { title, brand, price } = body;
    await connectToDatabase();
    console.log("api:", body)
    const newProduct = await Category.create(
        // { title, brand, price }
        body
    );
    return Response.json(newProduct, { status: 201 });
}
export async function PUT(req: Request) {
    await connectToDatabase()

    const body = await req.json()

    const { _id, ...update } = body

    await Category.updateOne({ _id }, update)
    return Response.json({ success: true })

}


export async function DELETE(req: Request) {
    await connectToDatabase()

    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")
    try {
        if (id) {
            await Category.deleteOne({ _id: id })
            return Response.json({ success: true })

        } else {

            return Response.json({ error: "Missing product ID" }, { status: 400 })
        }
    } catch (err) {
        console.log(err)
        return Response.json({ err: "Error fetching" }, { status: 500 })
    }
}
