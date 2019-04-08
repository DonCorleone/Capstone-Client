import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category, ICategory } from '../models/category';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { IItem } from '../models/item';
import { ISubcategory } from '../models/subcategory';
import { isListLikeIterable } from '@angular/core/src/change_detection/change_detection_util';



@Injectable({
  providedIn: 'root'
})

export class ItemsService {

  items: IItem[];
  categories: ICategory[] = [];
  subcategories: ISubcategory[] = [];
  featuringItems: IItem[] = [];

  constructor(private http: HttpClient) {

  }
  configUrl = 'assets/config.json';

  getItems(): Observable<Array<ICategory>> {
    return this.http.get<ICategory[]>('https://webmppcapstone.blob.core.windows.net/data/itemsdata.json').pipe(
      map(response => response.map((category: ICategory) => new Category().deserialize(category))));
  }

  loadItems(): Observable<IItem[]> {
    this.getItems()
      // resp is of type `HttpResponse<Config>`
      .subscribe(resp => {
        // access the body directly, which is typed as `Config`.
        this.categories = resp;
        const subcategoriesLoop: ISubcategory[] = [];
        const itemsLoop: IItem[] = [];

        this.categories.forEach(category => {

          category.subcategories.forEach(subcategory => {

            subcategoriesLoop.push(subcategory);
            subcategory.items.forEach(item => {

              itemsLoop.push(item);
            });
          });
        });
        this.subcategories = subcategoriesLoop;
        this.items = itemsLoop;
        return this.items;
      });

    // case else
    return new Observable<Array<IItem>>();
  }
}
