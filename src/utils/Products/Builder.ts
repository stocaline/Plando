import { ProductsProps } from "../../@types/product"


//@ts-ignore
export function builderProduct(product: ProductsProps) {

    const item = {
        _id: product._id,
        name: product.name,
        price: product.price,
        img: product.img,
        link: product.link,
        from: product.from,
        created_at: product.created_at,
    }
    return item
}

//@ts-ignore
export function openProduct(product: ProductsProps, navigation) {
    const item = {
        _id: product._id,
        name: product.name,
        price: product.price,
        img: product.img,
        link: product.link,
        from: product.from,
        created_at: product.created_at.toISOString(),
    }
    //@ts-ignore
    navigation.navigate("ViewProduct", { product: item })
}