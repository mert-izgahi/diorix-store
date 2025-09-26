import { faker } from "@faker-js/faker";
import Product, { type ProductDocumentType } from "./models/product.model";
import { connectDb } from "./lib/mongoose";
import { MONGODB_URI } from "./config";


const generateFakeProduct = ({ override }: { override?: Partial<ProductDocumentType> }) => {
    return {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        category: faker.helpers.arrayElement([
            "laptops",
            "phones",
            "cameras",
            "tablets",
            "computers",
            "accessories",
            "headphones",
            "other"
        ]),

        attributes: [
            { name: "Color", value: faker.color.human() },
            { name: "Size", value: faker.helpers.arrayElement(["S", "M", "L", "XL", "XXL"]) },
            { name: "Material", value: faker.helpers.arrayElement(["Leather", "Metal", "Plastic", "Glass"]) },
        ],
        images: new Array(3).fill(faker.image.url()),
        isAvailable: faker.datatype.boolean(),
        isFeatured: faker.datatype.boolean(),
        ...override
    }
}


const seedProductsCollection = async (count: number) => {
    for (let i = 0; i < count; i++) {
        const _product = generateFakeProduct({});
        await Product.create(_product);
    }
}


const main = async () => {
    try {

        await connectDb(MONGODB_URI!);

        // Clear products collection
        await Product.deleteMany({});

        // Seed Products Data
        await seedProductsCollection(10);

        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}


main();