import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';
import { ICategory } from 'src/app/models/category';
import { ISubcategory } from 'src/app/models/subcategory';
import { IItem } from 'src/app/models/item';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  constructor(private itemsService: ItemsService) { }

  item: IItem;
  errors: string;

  ngOnInit() {
    this.errors = '';
    this.loadItem();
  }

  loadItem() {

    this.itemsService.getItem('xxx')
      .subscribe(resp => {

        this.item = resp;
      });
  }
}
