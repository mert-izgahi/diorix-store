import mongoose, { Document, Model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config";
export interface AccountDocumentType extends Document {
    name: string;
    email: string;
    password: string;
    role: "user" | "admin";
    phone?: string;
    forgotPasswordtoken?: string;
    forgotPasswordTokenExpiry?: Date;
    isActive: boolean;
    billingAddress?: {
        address: string;
        city: string;
        state: string;
        postalCode: string;
        country: string
    }

    createdAt: Date;
    updatedAt: Date;

    comparePassword(password: string): Promise<boolean>;
    generateForgotPasswordToken(): string;
    generateJwtToken(): string;
}


interface AccountModelType extends Model<AccountDocumentType> {
    findByCredentials(email: string, password: string): Promise<AccountDocumentType | null>;
    findByForgotPasswordToken(token: string): Promise<AccountDocumentType | null>;
}


const accountSchema = new mongoose.Schema<AccountDocumentType>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: String,
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    phone: String,
    forgotPasswordtoken: String,
    forgotPasswordTokenExpiry: Date,
    isActive: {
        type: Boolean,
        default: true
    },
    billingAddress: {
        address: String,
        city: String,
        state: String,
        postalCode: String,
        country: String
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true
    }
});


accountSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    if (this.password) {
        this.password = await bcrypt.hash(this.password, salt);
    }
});


accountSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
}


accountSchema.methods.generateJwtToken = function (): string {
    const payload = {
        id: this._id.toString(),
        email: this.email
    }

    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: "7d"
    })
}

accountSchema.statics.findByCredentials = async function (email: string, password: string): Promise<AccountDocumentType | null> {
    const account = await Account.findOne({ email });
    if (account) {
        const isMatch = await account.comparePassword(password);
        if (isMatch) {
            return account;
        }
    }
    return null;
}


const Account = mongoose.model<AccountDocumentType, AccountModelType>("Account", accountSchema);

export default Account;