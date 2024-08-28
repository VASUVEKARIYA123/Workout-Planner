//controllers/auth.js
import { validationResult } from "express-validator";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
        createError(422,'Invalid inputs passed, please check your data.')
        );
    }
    const { username, email, password } = req.body;

    let existingUser
    try {
        existingUser = await User.findOne({ email: email });
    }catch(err){
        return next(createError(500,"Register failed, please try again later."))
    }
        
    if (existingUser) {
        const error = createError(422,'User exists already, please login instead.') 
        return next(error);
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({
        username,
        email,
        password: hash,
    });

    try{
        await newUser.save()
    }catch (err) {
        const error = createError(500,'Register failed, please try again.')
        return next(error);
    }

    res.status(201).json({user: newUser.toObject({getters : true})});
};


export const login = async (req, res, next) => {
    const { email, password } = req.body;
    let existingUser;

    try {
        existingUser = await User.findOne({ email: email })
    } catch (err) {
        const error = createError(500,'Logging in failed, please try again later.');
        return next(error);
    }

    const isPasswordCorrect = await bcrypt.compare(
        password,
        existingUser.password
    );

    if(!existingUser || !isPasswordCorrect){
        const error = createError(401,'Invalid credentials, could not log you in.');
        return next(error);
    }
    // try {
        
    //     const token = jwt.sign(
    //         { id: user._id, isAdmin: user.isAdmin },
    //         process.env.JWT
    //     );

    //     const { password, isAdmin, ...otherDetails } = user._doc;
    //     res
    //         .cookie("access_token", token, {
    //             httpOnly: true,
    //         })
    //         .status(200)
    //         .json({ details: { ...otherDetails }, isAdmin });
    // } catch (err) {
    //     next(err);
    // }

    res.json({message : "Logged in!"});

};
