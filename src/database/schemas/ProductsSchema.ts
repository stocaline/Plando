export const ProductsSchema = {
    name: "Products",
    properties: {
        _id: "string",
        name: "string",
        link: "string",
        price: "string",
        img: "string",
        from: "string",
        purchased: "bool",
        created_at: "date",
    },
    
    primaryKey: "_id",
}



