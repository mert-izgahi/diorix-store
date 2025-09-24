import mongoose, { Document, Model } from "mongoose";

export interface ProductDocumentType extends Document {
    name: string;
    description: string;
    price: number;
    images: string[];
    category: string;
    attributes: { name: string, value: string }[];
    rating: number;
    numReviews: number;
    isAvailable: boolean;
    isFeatured: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const productSchema = new mongoose.Schema<ProductDocumentType>({
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    images: {
        type: [String],
        default: []
    },
    category: {
        type: String,
        required: true
    },
    attributes: {
        type: [
            {
                name: String,
                value: String
            }
        ],
        default: []
    },
    rating: {
        type: Number,
        default: 3,
        max: 5,
        min: 0
    },
    numReviews: {
        type: Number,
        default: 0
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    isFeatured: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
})


const Product = mongoose.model<ProductDocumentType>("Product", productSchema);

export default Product;