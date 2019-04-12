import { Injectable } from '@angular/core';
import { StockManipulator } from '../models/stockManipulator';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  // tslint:disable-next-line:variable-name
  private _stockManipulator: StockManipulator = new StockManipulator(77);
  public get stockManipulator(): StockManipulator {
    return this._stockManipulator;
  }
  public set stockManipulator(value: StockManipulator) {
    this._stockManipulator = value;
  }

  constructor() { }
}
