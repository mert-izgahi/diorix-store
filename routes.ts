import { Router } from "express";
import { signUp, signIn, signOut, getProfile } from "./controllers/auth.controllers";
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from "./controllers/product.controllers";
import { tryCatchMiddleware } from "./middlewares/try-catch.middleware";
import { authMiddleware } from "./middlewares/auth.middleware";

const router = Router();

router.post("/api/auth/signup", tryCatchMiddleware(signUp));
router.post("/api/auth/signin", tryCatchMiddleware(signIn));
router.post("/api/auth/signout", tryCatchMiddleware(signOut));

router.get("/api/profile", authMiddleware, tryCatchMiddleware(getProfile));


router.get("/api/products", tryCatchMiddleware(getProducts));
router.get("/api/products/:id", tryCatchMiddleware(getProduct));
router.post("/api/products", tryCatchMiddleware(createProduct));
router.patch("/api/products/:id", tryCatchMiddleware(updateProduct));
router.delete("/api/products/:id", tryCatchMiddleware(deleteProduct));


export default router;