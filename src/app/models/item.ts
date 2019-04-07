import { Deserializable } from './deserializable.model';

export interface IItem {
  name: string;
  description: string;
  price: number;
  imagelink: string;
  rating: string;
  stock: string;
  category: string;
  subcategory: string;
}

export class Item implements IItem, Deserializable<Item> {

  name: string;
  description: string;
  price: number;
  imagelink: string;
  rating: string;
  stock: string;
  category: string;
  subcategory: string;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
