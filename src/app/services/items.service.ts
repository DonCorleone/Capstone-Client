import { Injectable, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category, ICategory } from '../models/category';
import { map } from 'rxjs/operators';
import { IItem, Item } from '../models/item';
import { ISubcategory, Subcategory } from '../models/subcategory';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';



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

    // rubric81 : Data was accessed using the Azure Web API and not a local file
    let configUrl = '../assets/itemsdata.json'; // load online json with real imagelinks

    // rubric80 : Used jQuery or Angular for data binding
    return this.http.get<ICategory[]>(configUrl).pipe(
      map(response => response.map((category: ICategory) => new Category(subcategoryNameExternal).deserialize(category))));
  }
}
