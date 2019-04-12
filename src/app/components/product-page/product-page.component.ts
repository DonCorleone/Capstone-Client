import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';
import { ICategory } from 'src/app/models/category';
import { ISubcategory, Subcategory } from 'src/app/models/subcategory';
import { IItem, Item } from 'src/app/models/item';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private itemsService: ItemsService
  ) { }

  item$: Observable<IItem>;
  errors: string;
  itemId$: string;

  ngOnInit() {
    this.errors = '';


    // this.item$ = this.service.getItem('id');

    this.item$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.itemsService.getItemMock(params.get('id')))
    );

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
