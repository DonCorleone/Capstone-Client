import { Injectable } from '@angular/core';
import { StockManipulator } from '../models/stockManipulator';
import { IItem } from '../models/item';
import { ICartItem, CartItem } from '../models/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  // tslint:disable-next-line:variable-name
  private _stockManipulator: StockManipulator = new StockManipulator(1);
  public get stockManipulator(): StockManipulator {
    return this._stockManipulator;
  }
  public set stockManipulator(value: StockManipulator) {
    this._stockManipulator = value;
  }

  // tslint:disable-next-line:variable-name
  private _cart: ICartItem [] = [];
  public get cart(): ICartItem[] {
    return this._cart;
  }

  public set cart(cart: ICartItem[]) {
    this._cart = cart;
  }

  constructor() { }

  getAmountTotal(): number {
    return this._cart.reduce((sum, current) => sum + current.total, 0);
  }

  createOrUpdateCartItem(item: IItem, amount: number = 1) {
    let tempItem = this._cart.find(entry => entry.name === item.name);
    if (!tempItem) {
      // not found any existing > create and add to cart
      tempItem = new CartItem(item);
      tempItem.amount = amount;
      tempItem.total = amount * item.price;
      this._cart.push(tempItem);
    } else {
      // found an existing > update
      tempItem.amount += amount;
      tempItem.total += (amount * item.price);
    }
  }
}
