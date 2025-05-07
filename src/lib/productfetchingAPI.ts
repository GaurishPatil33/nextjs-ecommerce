
import productsData from "@/data/data"
export async function fetchAllProducts(limit?: number) {
    try {
        const url = limit ? `https://dummyjson.com/products?limit=${limit}` : `https://dummyjson.com/products?limit=100`
        const res = await fetch(url)
        const data = await res.json()
        return data.products


    } catch (err) {
        console.error("error fetching ", err)
        const data = productsData.slice(0, limit ? limit : 40)
        return data
    }

}
export async function fetchProductByID(id: number | string) {
    // console.log(typeof (id))
    try {
        console.log(id)
        const res = await fetch(`https://dummyjson.com/products/${id}`)
        const data = await res.json()
        // console.log(data)
        return data

    } catch (err) {
        console.warn("error", err)
        const data = productsData.filter((p) => p.id.toString() === id)
        // console.log(data[0])
        return data[0]
    }

}

export async function searchProduct(query: string) {
    try {
        const res = await fetch(`https://dummyjson.com/products/search?q=${query}&limit=100`)

        const data = await res.json()
        return data.products



    } catch (err) {
        console.warn("error", err)
        const data = productsData.filter((p) =>
            p.title.toLowerCase().includes(query.toLowerCase()) ||
            p.brand?.toLowerCase().includes(query.toLowerCase()) ||
            p.description.toLowerCase().includes(query.toLowerCase()) ||
            p.category.toLowerCase().includes(query.toLowerCase()) ||
            p.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase())))
        console.log(data)
        return data
    }

}
export async function fetchProductByCategory(query: string, limit?: number) {
    try {
        const url = limit ? `https://dummyjson.com/products/category/${query}?limit=${limit}` : `https://dummyjson.com/products/category/${query}`;
        const res = await fetch(url)
        const data = await res.json()
        return data.products

    } catch (err) {
        console.error("error", err)
        const res = productsData.filter((p) => p.category === query)
        return res
        // return []
    }

}
export async function fetchCategories() {
    try {
        const res = await fetch(`https://dummyjson.com/products/categories`)
        const data = await res.json()
        return data



    } catch (err) {
        console.warn("error", err)
        const data = Array.from(new Set(productsData.map((p) => p.category)))
        console.log(data)
        return data
        // return []
    }
}