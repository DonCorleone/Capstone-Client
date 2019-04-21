import { Injectable, OnInit, isDevMode } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category, ICategory } from '../models/category';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { IItem, Item } from '../models/item';
import { ISubcategory, Subcategory } from '../models/subcategory';



@Injectable({
  providedIn: 'root'
})

export class ItemsService implements OnInit {

  items: IItem[] = [];
  categories: ICategory[] = [];
  subcategories: ISubcategory[] = [];
  featuringItems: IItem[] = [];

  public get configUrl() {
    if (isDevMode()) {
      return '../assets/itemsdata.json';
    } else {
      return 'https://webmppcapstone.blob.core.windows.net/data/itemsdata.json';
    }
  }

  // '../assets/itemsdata.json';

  ngOnInit(): void {
    const x = 'ngOnInit';
    console.log(x);
  }

  constructor(private http: HttpClient) {
    const ctr = 'ctr';
    console.log(ctr);
  }

  getItems(): Observable<Array<ICategory>> {

    // ToDo Interactive URL
    // return this.http.get<ICategory[]>('https://webmppcapstone.blob.core.windows.net/data/itemsdata.json').pipe(
    //   map(response => response.map((category: ICategory) => new Category().deserialize(category))));

    return this.http.get<ICategory[]>(this.configUrl).pipe(
      map(response => response.map((category: ICategory) => new Category().deserialize(category))));
  }
}
