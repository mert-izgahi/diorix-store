import type { Request, Response } from "express";
import { UnauthenticatedError, ConflictError } from "../utils/app-errors";
import Account from "../models/account.model";

export const signUp = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    // Check if user already exists
    const account = await Account.findOne({ email });
    if (account) {
        throw new ConflictError("User already exists");
    }

    const newAccount = await Account.create({ name, email, password });


    const token = await newAccount.generateJwtToken();

    // Assign token to cookies
    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 DAYS
    })


    res.status(201).json({
        success: true,
        message: "User created successfully",
        result: newAccount
    })
}


export const signIn = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const account = await Account.findByCredentials(email, password);

    if (!account) {
        throw new UnauthenticatedError("Invalid credentials");
    }

    const token = await account.generateJwtToken();

    // Assign token to cookies
    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 DAYS
    })


    res.status(200).json({
        success: true,
        message: "User signed in successfully",
        result: account
    })
}


export const signOut = async (req: Request, res: Response) => {
    res.clearCookie("token");
    res.status(200).json({
        success: true,
        message: "User signed out successfully",
        result: null
    })
}

export const getProfile = async (req: Request, res: Response) => {
    const account = res.locals.account
    res.status(200).json({
        success: true,
        message: "User profile fetched successfully",
        result: account
    })
}