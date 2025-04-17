
export async function fetchAllProducts() {
    try {
        const res = await fetch('https://dummyjson.com/products')
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
        const res = await fetch(`https://dummyjson.com/products/search?q=${id}`)

        const data = await res.json()
        return data.products


    } catch (err) {
        console.error("error", err)
        return []
    }

}
export async function fetchProductByCategory(id: string) {
    try {
        const res = await fetch(`https://dummyjson.com/products/category/${id}`)
        const data = await res.json()
        return data.products

    } catch (err) {
        console.error("error", err)
        return []
    }

}