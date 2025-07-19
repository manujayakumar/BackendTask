import { LinkPrecedence } from "@prisma/client";
import prisma from "../../../db/db.config";

interface Data{
    email: string | null;
    phoneNumber: string | null;
    linkPrecedence?: string;
    linkedId?: number;
}

//List contact
export const orderList = async()=>{
    try {
        return await prisma.contact.findMany({
            select:{
                id: true,
                email: true,
                phoneNumber: true,
                linkedId: true,
                linkPrecedence: true,
                createdAt: true
            }
        });
    } catch (error) {
        console.error(`There's an error:`,error)
    }
}
//create contact
export const identifyOrder = async(data: Data)=>{
    try {

        return await prisma.contact.create({
            data:{
                email: data.email,
                phoneNumber: data.phoneNumber,
                linkPrecedence: "PRIMARY"
            }
        })
    } catch (error) {
        console.error(`There's an error:`,error)
    }
}

//check for dulplicat contact details
export const matchedContacts = async(data: Data)=>{
    try{
        return await prisma.contact.findMany({
            where:{
                OR:[
                    {email: data.email},
                    {phoneNumber: data.phoneNumber}
                ]
            },
            orderBy:{
                createdAt: "asc"
            }
        })
    }catch (error) {
        console.error(`There's an error:`,error)
    }

}
// create contact linking with primary contact id
export const secondaryOrder = async(data: Data)=>{
    try {

        return await prisma.contact.create({
            data:{
                email: data.email,
                phoneNumber: data.phoneNumber,
                linkPrecedence: "SECONDARY",
                linkedId: data.linkedId
            }
        })
    } catch (error) {
        console.error(`There's an error:`,error)
    }
}
// Grouping contacts
export const gatherContacts = async(id: number)=>{
    try{
        return await prisma.contact.findMany({
            where:{
                OR:[
                    {id: id},
                    {linkedId: id}
                ]
            },
            orderBy:{
                createdAt: "asc"
            }
        })
    }catch (error) {
        console.error(`There's an error:`,error)
    }
}