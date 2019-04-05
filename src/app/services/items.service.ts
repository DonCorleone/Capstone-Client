import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})

export class ItemsService {

  constructor(private http: HttpClient) {

  }
  configUrl = 'assets/config.json';

  getItems(): Observable<Category[]> {
    return this.http.get<Category[]>('assets/itemsdata.json');
  }
}
