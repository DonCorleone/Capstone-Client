import { Component, OnInit, Input } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';
import { Subcategory, ISubcategory } from 'src/app/models/subcategory';
import { Item, IItem } from 'src/app/models/item';
import { ICategory } from 'src/app/models/category';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private itemsService: ItemsService) { }

  categories: ICategory[] = [];
  subcategories: ISubcategory[] = [];

  @Input()
  items: IItem[] = [];

  ngOnInit() {

    this.showItems();
  }

  showItems() {
    this.itemsService.getItems()
      // resp is of type `HttpResponse<Config>`
      .subscribe(resp => {
        // access the body directly, which is typed as `Config`.
        this.categories = resp;
        const subcategoriesLoop: Subcategory[] = [];
        const itemsLoop: Item[] = [];

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
      });
  }
}
