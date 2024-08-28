//routes/auth.js

import express from "express";
import { check } from "express-validator";

import { login, register } from "../controllers/auth.js ";

const router = express.Router();

router.post(
    "/register",
    [
        check("name").not().isEmpty(),
        check("email").normalizeEmail().isEmail(),
        check("password").isLength({ min: 8 })
    ] ,
    register
);
router.post(
    "/login", 
    [
        check("email").normalizeEmail().isEmail(),
        check("password").isLength({ min: 8 })
    ],
    login
);

export default router;
