import express from "express";
import { deleteUser, editUser, getUser, login, signUp } from "../controller/user.controller.js";
import { authentication } from "../middleware/authentication.js";

const router = express.Router()

router.post("/create-user" , signUp);
router.post("/login" , login);
router.get("/:name" , authentication , getUser);
router.delete("/:name" , authentication , deleteUser);
router.put("/:name" , editUser)

export default router