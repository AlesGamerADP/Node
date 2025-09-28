import express from "express";
import postController from "../controllers/postController.js";

const router = express.Router();

router.get("/", postController.getAll);

router.get("/create/:userId", postController.createForm);

router.post("/create/:userId", postController.create);

router.get("/edit/:id", postController.editForm);

router.post("/update/:id", postController.updatePost);

router.get("/delete/:id", postController.delete);

export default router;
