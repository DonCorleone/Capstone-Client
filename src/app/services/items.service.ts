import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category, ICategory } from '../models/category';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class ItemsService {

  constructor(private http: HttpClient) {

  }
  configUrl = 'assets/config.json';

  getItems(): Observable<Array<ICategory>> {
    return this.http.get<ICategory[]>('https://webmppcapstone.blob.core.windows.net/data/itemsdata.json').pipe(
      map(response => response.map((category: ICategory) => new Category().deserialize(category))));
  }
}
