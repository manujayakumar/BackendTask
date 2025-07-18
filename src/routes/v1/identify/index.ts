import express, {Router} from "express";
import { identifyOrder, orderList } from "./controller";

const identify: Router = express.Router();

identify.route('/')
    .get(orderList)
    .post(identifyOrder);


export default identify;