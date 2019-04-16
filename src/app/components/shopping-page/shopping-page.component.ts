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

  oderByItems: string[] = [];
  orderBy: string;

  constructor(private itemsService: ItemsService) { }

  ngOnInit() {

    this.loadItems();
    this.oderByItems = ['Alphabetical', 'Price', 'Rating'];
  }

  loadItems() {

    if (this.selectedSubcategory != null) {
      const subcategoryName = this.selectedSubcategory.name.toLowerCase();
      this.filteredItems = this.itemsStock
        .filter(itemInStock =>
          itemInStock.subcategory.toLowerCase() === subcategoryName)
        .sort((n1, n2) => {
          if (n1[this.orderBy] > n2[this.orderBy]) {
              return 1;
          }
          if (n1[this.orderBy] < n2[this.orderBy]) {
              return -1;
          }
          return 0;
      });
      return;
    }

    if (this.selectedCategory != null) {
      const categoryName = this.selectedCategory.category.toLowerCase();
      this.filteredItems = this.itemsStock
        .filter(itemInStock =>
          itemInStock.category.toLowerCase() === categoryName)
        .sort((n1, n2) => {
          if (n1[this.orderBy] > n2[this.orderBy]) {
              return 1;
          }
          if (n1[this.orderBy] < n2[this.orderBy]) {
              return -1;
          }
          return 0;
      });
      return;
    }

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
        this.filteredItems = itemsLoop
          .filter(itemInStock =>
            itemInStock.category.toLowerCase() === resp[0].category.toLowerCase())
          .sort((n1, n2) => {

            if (n1[this.orderBy] > n2[this.orderBy]) {
                return 1;
            }
            if (n1[this.orderBy] < n2[this.orderBy]) {
                return -1;
            }
            return 0;
          });
        }
      );
  }

  onClickCategory(category: ICategory) {
    this.selectedCategory = category;
    this.selectedSubcategory = null;
    this.selectedItem = null;

    this.loadItems();
  }

  onClickSubcategory(subcategory: ISubcategory) {

    this.selectedSubcategory = subcategory;
    this.selectedItem = null;

    this.loadItems();
  }

  setOrderBy(orderBy: string) {
    this.orderBy = orderBy === 'Alphabetical' ? 'name' : orderBy.toLowerCase();
    this.loadItems();
  }
}
