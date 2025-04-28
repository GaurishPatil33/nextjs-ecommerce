
export async function fetchAllProducts(limit?: number) {
    try {
        const url = limit ? `https://dummyjson.com/products?limit=${limit}` : `https://dummyjson.com/products?limit=100`
        const res = await fetch(url)
        const data = await res.json()
        return data.products

    } catch (err) {
        console.error("error fetching ", err)
        return []
    }

}
export async function fetchProductByID(id: string) {
    try {
        // console.log(id)
        const res = await fetch(`https://dummyjson.com/products/${id}`)
        const data = await res.json()

        return data

    } catch (err) {
        console.error("error", err)
        return []
    }

}

export async function searchProduct(id: string) {
    try {
        // const url = limit ? `https://dummyjson.com/products/search${id}?limit=${limit}` : `https://dummyjson.com/products/category/${id}`;
        const res = await fetch(`https://dummyjson.com/products/search?q=${id}&limit=100`)

        const data = await res.json()
        // console.log(data.products)
        return data.products


    } catch (err) {
        console.error("error", err)
        return []
    }

}
export async function fetchProductByCategory(id: string, limit?: number) {
    try {
        const url = limit ? `https://dummyjson.com/products/category/${id}?limit=${limit}` : `https://dummyjson.com/products/category/${id}`;
        const res = await fetch(url)
        const data = await res.json()
        return data.products

    } catch (err) {
        console.error("error", err)
        return []
    }

}
export async function fetchCategories() {
    try {
        const res = await fetch(`https://dummyjson.com/products/categories`)
        const data = await res.json()
        return data

    } catch (err) {
        console.error("error", err)
        return []
    }

}