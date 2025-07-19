import {orderList, identifyOrder, matchedContacts, secondaryOrder} from "./model";
import { Data } from "../../../types";

export const identifyService ={

    getList: async() =>{
        try {
            return await orderList();
        } catch (error) {
            console.error("Something occured", error)
        }
    },

    identifyOrder: async(data: Data) => {
        try {
            
            if( !data.email || !data.phoneNumber){
                return {
                    status: 400,
                    message: "Required email or phoneNumber"
                }
            }
            const newData = {
                email: data.email.trim() || null,
                phoneNumber: data.phoneNumber.toString() || null,
                
            }

            //check for duplicate
            const dulplicateContact = await matchedContacts(newData);
            console.log(dulplicateContact);

            if(dulplicateContact?.length === 0){
                //create new contact
                const newContact = await identifyOrder(newData);
                return {
                    contact:{
                        primaryContactId: newContact?.id,
                        emails: [newContact?.email].filter(Boolean),
                        phoneNumbers: [newContact?.phoneNumber].filter(Boolean),
                        secondaryContactIds: []
                    }
                }
            }else{
            // find the primary contact
            const primaryContact =  dulplicateContact?.find(contact => contact.linkPrecedence === "PRIMARY") || dulplicateContact?.[0];
            if (!primaryContact) {
                console.log('No primary contact found.');
                return;
            }
            //check if new info and needs to be linked
            const existingContact = dulplicateContact?.some(contact =>{
                contact.email === newData.email && contact.phoneNumber === newData.phoneNumber
            });

            if(!existingContact){
                const newValue = {
                    email: newData.email,
                    phoneNumber: newData.phoneNumber,
                    linkedId: primaryContact?.id,
                }
                const newContact = await secondaryOrder(newValue);
            }
            
        }
           
        } catch (error) {
            console.error("Something occured", error);
        }
    }
}