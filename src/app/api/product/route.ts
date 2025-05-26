import { connectToDatabase } from "@/lib/db/db";
import Product2 from "@/lib/model/Product";


export async function GET(req: Request) {
    await connectToDatabase()

    // const products = await Product2.find()
    // return Response.json(products)

    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")
    try {
        if (id) {
            const products = await Product2.findById(id)
            return Response.json(products)

        } else {
            const products = await Product2.find()
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
    const newProduct = await Product2.create(
        // { title, brand, price }
        body
    );
    return Response.json(newProduct, { status: 201 });
}



export async function PUT(req: Request) {
    await connectToDatabase()

    const body = await req.json()

    const { _id, ...update } = body

    await Product2.updateOne({ _id }, update)
    return Response.json({ success: true })

}


export async function DELETE(req: Request) {
    await connectToDatabase()

    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")
    try {
        if (id) {
            await Product2.deleteOne({ _id: id })
            return Response.json({ success: true })

        } else {

            return Response.json({ error: "Missing product ID" }, { status: 400 })
        }
    } catch (err) {
        console.log(err)
        return Response.json({ err: "Error fetching" }, { status: 500 })
    }
}
