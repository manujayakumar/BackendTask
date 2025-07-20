import {orderList, identifyOrder, matchedContacts,updateContact, secondaryOrder, gatherContacts} from "./model";
import { Contact, Data } from "../../../types";

function formatContactResponse(primaryId:number, contacts:Contact[]){
    return{
        contact: {
            primaryContactId: primaryId,
            emails: Array.from (new Set(contacts.map(c => c.email).filter(Boolean))),
            phoneNumbers: Array.from(new Set(contacts.map(c=> c.phoneNumber).filter(Boolean))),
            secondaryContactIds: contacts.filter(c=>c.linkPrecedence === "SECONDARY").map(c=> c.id),
        }
    };
}
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

            if(!dulplicateContact || dulplicateContact?.length === 0){
                //create new contact
                const newContact = await identifyOrder({...newData, linkPrecedence: "PRIMARY"});
                if(newContact)
                return formatContactResponse(newContact?.id, [newContact])
            }
            // find the primary contact
            //Find oldest contact to be the real primary
            if(dulplicateContact){
                const sortedContacts = dulplicateContact.sort(
                (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
                );
            
            
            const primaryContact = sortedContacts[0];
            //determin actual primary
            if(dulplicateContact)
                for(const contact of dulplicateContact){
                    if(contact.id !== primaryContact.id && contact.linkPrecedence === "PRIMARY"){
                        await updateContact(contact.id, primaryContact.id);
                    }
                }
            //check if new info and needs to be linked
        
            const emailExist = dulplicateContact.some(contact => contact.email === newData.email);
            const phoneExist = dulplicateContact.some(contact => contact.phoneNumber === newData.phoneNumber);

            const isNewInfo = !(emailExist && phoneExist);

            if(isNewInfo){
        
                await secondaryOrder({
                    ...newData,
                    linkedId: primaryContact.id
                });
            }
            //Gather all linked contacts
            const relatedContacts = await gatherContacts(primaryContact?.id );
            if(relatedContacts)
            return formatContactResponse(primaryContact.id, relatedContacts)
            
            }
           
        } catch (error) {
            console.error("Something occured", error);
        }
    }
}