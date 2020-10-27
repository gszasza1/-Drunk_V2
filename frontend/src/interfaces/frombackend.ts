export interface Festival {
    festivalName: string;
    place: string;
    time?: Date;
    ticket?: { ticketName: string; ticketPrice: number }[];
}

export interface Drink {
    drinkName: string;
    price: number;
    provider: string;
}
export interface User {
    username: string;
    password: string;
    fullName?: string;
}
export enum UserType {
    Member,
    Firm
}
export interface DrinkPopulated {
    drinkName: string;
    price: number;
    provider: User;
}
export interface DrinkBody {
    drinkName: string;
    price: number;
}
