export interface IShippingDetail {
  FirstName: string;
  LastName: string;
  AdressOne: string;
  AdressTwo: string;
  Phone: string;
  Zip: number;
  State: string;
  City: string;
}

export class ShippingDetail implements IShippingDetail {
  FirstName: string;
  LastName: string;
  AdressOne: string;
  AdressTwo: string;
  Phone: string;
  Zip: number;
  State: string;
  City: string;
}
