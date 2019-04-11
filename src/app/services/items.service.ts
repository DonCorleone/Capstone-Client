import { Injectable, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category, ICategory } from '../models/category';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { IItem, Item } from '../models/item';
import { ISubcategory, Subcategory } from '../models/subcategory';
import { isListLikeIterable } from '@angular/core/src/change_detection/change_detection_util';



@Injectable({
  providedIn: 'root'
})

export class ItemsService implements OnInit {

  items: IItem[] = [];
  categories: ICategory[] = [];
  subcategories: ISubcategory[] = [];
  featuringItems: IItem[] = [];

  configUrl = 'assets/itemsdata.json';

  ngOnInit(): void {
    const x = 'ngOnInit';
    console.log(x);
  }



  constructor(private http: HttpClient) {
    const ctr = 'ctr';
    console.log(ctr);
    this.fillItems();
  }

  fillItems(): Observable<boolean> {
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
        return of(true);
      });
    return of(false);
  }

  getItemCached(id: string): Observable<IItem> {
    if (this.items.length < 1) {
      this.fillItems().subscribe(
        res => {
          return res === true ?
            this.filterItem(id) : this.getItemCached(id)
            ;
        }
      );
    } else {
      return this.filterItem(id);
    }
  }

  filterItem(id: string): Observable<IItem> {
    return of(this.items.find((itemLoop: IItem) => itemLoop.name === id));
  }

  getItems(): Observable<Array<ICategory>> {

    // ToDo Interactive URL
    // return this.http.get<ICategory[]>('https://webmppcapstone.blob.core.windows.net/data/itemsdata.json').pipe(
    //   map(response => response.map((category: ICategory) => new Category().deserialize(category))));

    return this.http.get<ICategory[]>(this.configUrl).pipe(
      map(response => response.map((category: ICategory) => new Category().deserialize(category))));
  }

  getItemMock(id: string): Observable<IItem> {

    return of(new Item({
      name: 'Toilette Paper',
      description: '6 2-Pack, Regular Roll Toilette Paper',
      price: 7.25,
      imagelink: 'https://webmppcapstone.blob.core.windows.net/house-royaltyfree/toiletpaper.png',
      rating: '2',
      stock: '0',
      category: 'Household and Beauty',
      subcategory: 'Household Supplies'
    }));

  }

  // getItems3(): Observable<Array<ICategory>> {

  //   // ToDo Interactive URL
  //   // return this.http.get<ICategory[]>('https://webmppcapstone.blob.core.windows.net/data/itemsdata.json').pipe(
  //   //   map(response => response.map((category: ICategory) => new Category().deserialize(category))));

  //   return this.http.get<ICategory[]>(this.configUrl).pipe(
  //   return map(response => response.map((category: ICategory) => category.subcategories.(x => x.items))),
  //     map(response => response.ma({
  //       subcategories.map((subcategory: ISubcategory) => new Subcategory().deserialize(subcategory).items);
  //     }),
  //       map(items => items: ICategory) => new Category().deserialize(category))));
  // }

  getItem(id: string): Observable<IItem> {

    // let itemTemp: IItem;

    this.getItems().subscribe(
      cats => {
        cats.forEach((category: ICategory) => {
          category.subcategories.forEach((subcategory: ISubcategory) => {
            return of(subcategory.items.find((itemLoop: IItem) => itemLoop.name === id));
          });
        });
      }
    );

    // case else
    return of(new Item());
  }
  // return of(new Item({
  //     name: itemTemp.name,
  //     description: itemTemp.description,
  //     price: itemTemp.price,
  //     imagelink: itemTemp.imagelink,
  //     rating: itemTemp.rating,
  //     stock: itemTemp.stock,
  //     category: itemTemp.category,
  //     subcategory: itemTemp.subcategory
  //   })
  // );




  //   this.categories = resp;
  //   const subcategoriesLoop: ISubcategory[] = [];
  //   const itemsLoop: IItem[] = [];

  //   this.categories.forEach(category => {

  //     category.subcategories.forEach(subcategory => {

  //       subcategoriesLoop.push(subcategory);
  //       subcategory.items.forEach(item => {

  //         itemsLoop.push(item);
  //       });
  //     });
  //   });
  //   this.subcategories = subcategoriesLoop;
  //   this.items = itemsLoop;
  //   // return this.items.filter(item => item.name === id);
  // });

  //   // case else
  //   return new Observable<Item>();



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
