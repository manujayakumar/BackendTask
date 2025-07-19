export interface Data{
    email: string | null;
    phoneNumber: string | null;
}

export interface Contact{
    id: number;
    phoneNumber: string | null;
    email: string | null;
    linkedId: number | null;
    linkPrecedence: "PRIMARY" | "SECONDARY";
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}