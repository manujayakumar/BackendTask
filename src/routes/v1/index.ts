import express,{ Router } from "express";
import identify from "./identify";

const v1: Router = express.Router();

v1.use('/identify', identify);

export default v1;