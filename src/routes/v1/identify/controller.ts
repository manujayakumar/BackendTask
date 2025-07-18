import express,{Request, Response} from "express"
export const orderList = (req: Request, res: Response) => {
    res.status(200).json({
        message: "All contacts",
    });
};

export const identifyOrder = (req: Request, res: Response)=>{
    res.status(201).json({
        message: "contacts created",
    });
};