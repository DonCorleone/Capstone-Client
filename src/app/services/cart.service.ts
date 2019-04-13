import { Injectable } from '@angular/core';
import { StockManipulator } from '../models/stockManipulator';
import { IItem } from '../models/item';

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
  private _cart: IItem [] = [];
  public get cart(): IItem[] {
    return this._cart;
  }

  public set cart(cart: IItem[]) {
    this._cart = cart;
  }
  constructor() { }
}
