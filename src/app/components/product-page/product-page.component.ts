import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';
import { ICategory } from 'src/app/models/category';
import { ISubcategory, Subcategory } from 'src/app/models/subcategory';
import { IItem, Item } from 'src/app/models/item';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable, observable, of } from 'rxjs';
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
  items: IItem[] = [];
  itemName = '';

  ngOnInit() {
    this.errors = '';

    this.route.paramMap.subscribe(
      params =>
        this.loadItems(params.get('id'))
    );
  }

  loadItems(id: string) {

    this.itemsService.getItems()
      .subscribe(resp => {

        //  this.categories = resp;
        const subcategoriesLoop: Subcategory[] = [];
        const itemsLoop: Item[] = [];

        resp.forEach(category => {

          category.subcategories.forEach(subcategory => {

            subcategoriesLoop.push(subcategory);
            subcategory.items.forEach(item => {

              itemsLoop.push(item);
            });
          });
        });
        //  this.subcategories = subcategoriesLoop;
        this.items = itemsLoop;
        return this.pickItem(id);
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
  pickItem(id: string) {
    // this.featuringItems = this.items.filter(isFeatured);
    //  const fg: FeaturingItems[] = [];
    const stringArray: string[] = [];
    stringArray.push(id);
    const itemsFeatured = this.items.filter(item => item.name === id);
    this.item$ = of(itemsFeatured.length > 0 ? itemsFeatured[0] : null);
  }
}
function isFeatured(filterItems, args) {
  return (filterItems !== null && filterItems.name === this.itemName);
}
