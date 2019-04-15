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
  filteredItems: IItem[];
  itemsStock: IItem[];

  selectedCategory: ICategory;
  selectedSubcategory: ISubcategory;
  selectedItem: IItem;

  constructor(private itemsService: ItemsService) { }

  ngOnInit() {

    this.loadItems();
  }

  loadItems() {

    this.itemsService.getItems()
      .subscribe(resp => {

        const subcategoriesLoop: ISubcategory[] = [];
        const itemsLoop: IItem[] = [];

        resp.forEach(category => {
          category.subcategories.forEach(subcategory => {
            // grab each categories' subcategories
            subcategoriesLoop.push(subcategory);
            subcategory.items.forEach(item => {
              // grab items of each subcategory
              itemsLoop.push(item);
            });
          });
        });

        // save member
        this.categories = resp;
        this.subcategories = subcategoriesLoop;
        this.itemsStock = itemsLoop;

        this.selectedCategory = resp[0];

        // Show first categories Items
        this.filteredItems = itemsLoop.filter(itemInStock =>
          itemInStock.category.toLowerCase() === resp[0].category.toLowerCase());
      });
  }

  onClickCategory(category: ICategory) {
    this.selectedCategory = category;
    this.selectedSubcategory = null;
    this.selectedItem = null;

    const categoryName = category !== null ? category.category.toLowerCase() : '';
    this.filteredItems = this.itemsStock.filter(itemInStock =>
      itemInStock.category.toLowerCase() === categoryName);
  }

  onClickSubcategory(subcategory: ISubcategory) {

    this.selectedSubcategory = subcategory;
    this.selectedItem = null;

    const subcategoryName = subcategory != null ? subcategory.name.toLowerCase() : '';
    this.filteredItems = this.itemsStock.filter(itemInStock =>
      itemInStock.subcategory.toLowerCase() === subcategoryName);
  }
}
