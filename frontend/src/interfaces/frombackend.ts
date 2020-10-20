export enum UserType {
    Member,
    Firm
}
export interface Festival {
    festivalName: string;
    place: string;
    time?: Date;
    ticket?: { ticketName: string; ticketPrice: number }[];
}
