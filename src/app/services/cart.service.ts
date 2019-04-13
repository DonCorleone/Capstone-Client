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

  public get subTotal(): number {
    return this._cart.reduce((sum, current) => sum + current.total, 0);
  }

  public get shipping(): number {
    return 10.00;
  }

  public get taxRate(): number {
    return 10;
  }

  public get tax(): number {
    return (this.taxRate / 100) * (this.subTotal + this.shipping);
  }

  public get cartTotal(): number {
    return (this.subTotal + this.tax + this.shipping);
  }

  public decrementAmount(cartItem: ICartItem) {
    // const tempItem = this._cart.find(entry => entry.name === cartItem.name);
    if (cartItem.amount === 1) {
      this.removeEntry(cartItem);
    } else {
      cartItem.amount --;
      cartItem.total -= cartItem.price;
    }
  }
  public incrementAmount(cartItem: ICartItem) {
    // const tempItem = this._cart.find(entry => entry.name === cartItem.name);
    cartItem.amount ++;
    cartItem.total += cartItem.price;
  }

  public removeEntry(cartItem: ICartItem) {
   // const tempItem = this._cart.find(entry => entry.name === cartItem.name);
   const index = this._cart.indexOf(cartItem, 0);
   if (index > -1) {
    this._cart.splice(index, 1);
   }
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
