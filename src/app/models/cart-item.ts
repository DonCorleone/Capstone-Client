import { IItem } from './item';
import { $ } from 'protractor';

export interface ICartItem extends IItem {
  amount: number;
  total: number;
}

export class CartItem implements ICartItem {
  amount: number;  total: number;
  name: string;
  description: string;
  price: number;
  imagelink: string;
  rating: string;
  stock: string;
  category: string;
  subcategory: string;

  constructor(item: IItem) {
    this.name = item.name;
    this.description = item.description;
    this.price = item.price;
    this.imagelink = item.imagelink;
    this.rating = item.rating;
    this.stock = item.stock;
    this.category = item.category;
    this.subcategory = item.subcategory;
  }
}
