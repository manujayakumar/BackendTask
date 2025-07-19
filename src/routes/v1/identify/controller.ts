import express,{Request, Response} from "express"
import { identifyService } from "./services";
export const orderList = async(req: Request, res: Response) => {
    try {
        const result = await identifyService.getList();
         res.status(200).json({
            message: "All contacts",
            data: result
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
   
};

export const identifyOrder = async(req: Request, res: Response)=>{

    try {
        const newData = req.body;
        const result = await identifyService.identifyOrder(newData);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
    
};