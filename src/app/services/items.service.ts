import { Injectable, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category, ICategory } from '../models/category';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { IItem, Item } from '../models/item';
import { ISubcategory, Subcategory } from '../models/subcategory';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})

export class ItemsService implements OnInit {

  items: IItem[] = [];
  categories: ICategory[] = [];
  subcategories: ISubcategory[] = [];
  featuringItems: IItem[] = [];

  ngOnInit(): void {
  }

  constructor(private http: HttpClient) {
  }

  getItems(): Observable<Array<ICategory>> {

    // ToDo Interactive URL
    let configUrl = '';
    if (!environment.production) { // ToDo : Hardcode url
      configUrl = '../assets/itemsdata.json';
    } else {
      configUrl = 'https://webmppcapstone.blob.core.windows.net/data/itemsdata.json'
    }

    return this.http.get<ICategory[]>(configUrl).pipe(
      map(response => response.map((category: ICategory) => new Category().deserialize(category))));
  }
}
