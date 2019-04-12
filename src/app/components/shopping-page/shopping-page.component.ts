import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';
import { ICategory } from 'src/app/models/category';
import { ISubcategory } from 'src/app/models/subcategory';
import { IItem } from 'src/app/models/item';

@Component({
  selector: 'app-shopping-page',
  templateUrl: './shopping-page.component.html',
  styleUrls: ['./shopping-page.component.scss']
})
export class ShoppingPageComponent implements OnInit {
  categories: ICategory[];
  subcategories: ISubcategory[];
  items: IItem[];
  itemsStock: IItem[];
  selectedItem: IItem;

  constructor(private itemsService: ItemsService) { }

  ngOnInit() {

    this.loadItems();
  }

  loadItems() {

    this.itemsService.getItems()
      .subscribe(resp => {

        this.categories = resp;
        const subcategoriesLoop: ISubcategory[] = [];


        const itemsLoop: IItem[] = [];
        this.categories.forEach(category => {

          category.subcategories.forEach(subcategory => {

            subcategoriesLoop.push(subcategory);
            subcategory.items.forEach(item => {
              // Fill Items of first Subcategory
              itemsLoop.push(item);
            });
          });
        });
        this.subcategories = subcategoriesLoop;
        this.itemsStock = itemsLoop;
        // Show first subcategories Items
        const filteredItems: IItem[] = [];
        this.items = itemsLoop.filter(itemInStock => itemInStock.subcategory.toLowerCase() === subcategoriesLoop[0].name.toLowerCase());
      });
  }

  onClickSubcategory(subcategoryName: string) {

    this.items = this.itemsStock.filter(itemInStock => itemInStock.subcategory.toLowerCase() === subcategoryName.toLowerCase());
  }
}
