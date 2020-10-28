export interface IUserSchema extends IUser {
  type: UserType;
  _id: string;
  createdAt: Date;
}
export interface IUser {
  username: string;
  password: string;
  fullName?: string;
}
export enum UserType {
  Member,
  Firm,
}

export interface IDecodedToken {
  exp: number;
  iat: number;
  type: UserType;
  username: string;
}
export interface IDrink {
  drinkName: string;
  price: number;
  provider: string;
}
export interface IDrinkPopulated {
  drinkName: string;
  price: number;
  provider: IUser;
}

export interface IFestivalPopulated {
  festivalName: string;
  place: string;
  time?: Date;
  ticket?: { ticketName: string; ticketPrice: number }[];
  participants?: IUser;
}
export interface IFestival {
  festivalName: string;
  place: string;
  time?: Date;
  ticket?: { ticketName: string; ticketPrice: number }[];
  participants?: string[];
}
export interface ISocketDrink {
  drinkId: string;
}
export interface IBuyDrink {
  provider: string;
  number: number;
  drinkId: string;
}
export interface IBuyDrinkSchema {
  _id: string;
  createdAt: Date;
  provider: string;
  number: number;
  drinkId: string;
}
export interface IBuyDrinkPopulated {
  provider: IUser;
  number: number;
  drinkId: IDrink;
}
