import { Router } from "express";
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from "./controllers/product.controllers";
import { tryCatchMiddleware } from "./middlewares/try-catch.middleware";

const router = Router();

router.get("/api/products", tryCatchMiddleware(getProducts));
router.get("/api/products/:id", tryCatchMiddleware(getProduct));
router.post("/api/products", tryCatchMiddleware(createProduct));
router.patch("/api/products/:id", tryCatchMiddleware(updateProduct));
router.delete("/api/products/:id", tryCatchMiddleware(deleteProduct));


export default router;