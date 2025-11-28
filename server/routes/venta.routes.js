import {Router} from "express";
import pool from "../bd.js";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { signToken, verifyToken, isAdmin } from "./auth.js"; 
dotenv.config();


const router = Router();

export default router;