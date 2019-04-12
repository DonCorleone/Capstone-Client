import { Component, OnInit, Input } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';
import { Subcategory, ISubcategory } from 'src/app/models/subcategory';
import { Item, IItem } from 'src/app/models/item';
import { ICategory } from 'src/app/models/category';
import { IFeaturingItems, FeaturingItems } from 'src/app/models/featuringitem';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private itemsService: ItemsService) { }

  categories: ICategory[] = [];
  subcategories: ISubcategory[] = [];
  items: IItem[] = [];
  featuringItems: IItem[] = [];
  featuringItemGroup: FeaturingItems[];

  ngOnInit() {

    this.loadItems();
  }

  loadItems() {

    this.itemsService.getItems()
      .subscribe(resp => {

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
        this.pickFeaturedItems();
        // const fg: FeaturingItems[] = [];
        // const itemsFeatured = this.items.filter(isFeatured);
        // for (let ix = 0; ix < itemsFeatured.length;) {
        //   const amountInGroup = 3; // ToDo = random(1,4);
        //   const featuringItems = new FeaturingItems();
        //   for (let ixInner = 0; ixInner < amountInGroup; ixInner++) {

        //     featuringItems.items.push(itemsFeatured[ix]);
        //     ix++;
        //   }
        //   fg.push(featuringItems);
        // }
        // this.featuringItemGroup = fg;
      });
  }
  pickFeaturedItems() {
    this.featuringItems = this.items.filter(isFeatured);
    const fg: FeaturingItems[] = [];
    const itemsFeatured = this.items.filter(isFeatured);
    for (let ix = 0; ix < itemsFeatured.length;) {
      const amountInGroup = 3; // ToDo = random(1,4);
      const featuringItems = new FeaturingItems();
      for (let ixInner = 0; ixInner < amountInGroup; ixInner++) {

        featuringItems.items.push(itemsFeatured[ix]);
        ix++;
      }
      fg.push(featuringItems);
    }
    this.featuringItemGroup = fg;
  }
}
function isFeatured(filterItems, index, array) {
  return (filterItems !== null && (parseInt(filterItems.rating, 10) > 4));
}
