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

  getItems(subcategoryNameExternal: string): Observable<Array<ICategory>> {

    // ToDo Interactive URL
    let configUrl = '';
    if (!environment.production) { // dev?
      configUrl = '../assets/itemsdata.json'; // load local file with non-existing imagelinks due to huge data volume
    } else {
      configUrl = 'https://webmppcapstone.blob.core.windows.net/data/itemsdata.json'; // load online json with real imagelinks
    }

    return this.http.get<ICategory[]>(configUrl).pipe(
      map(response => response.map((category: ICategory) => new Category(subcategoryNameExternal).deserialize(category))));
  }
}
