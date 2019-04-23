import { Component, OnInit, Input } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';
import { Subcategory, ISubcategory } from 'src/app/models/subcategory';
import { Item, IItem } from 'src/app/models/item';
import { ICategory } from 'src/app/models/category';
import { IFeaturingItems, FeaturingItems } from 'src/app/models/featuringitem';
import { Observable, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(
    private route: ActivatedRoute, private router: Router,
    private itemsService: ItemsService
    ) { }

  categories: ICategory[] = [];
  subcategories: ISubcategory[] = [];
  items: IItem[] = [];
  featuringItems: IItem[] = [];
  featuringItemGroup: FeaturingItems[];

  ngOnInit() {

    this.loadItems();
  }

  loadItems() {

    this.itemsService.getItems('')
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
      });
  }

  goToProduct(name: string) {

    this.router.navigate(['/product/' + name, { id: name, comingFrom: 'home' }]);
  }

  pickFeaturedItems() {
    this.featuringItems = this.items.filter(isFeatured);
    const fg: FeaturingItems[] = [];
    for (let ix = 0; ix < this.featuringItems.length;) {
      const amountInGroup = 3; // ToDo = random(1,4);
      const featuringItemsNew = new FeaturingItems();
      for (let ixInner = 0; ixInner < amountInGroup; ixInner++) {

        featuringItemsNew.items.push(this.featuringItems[ix]);
        ix++;
      }
      fg.push(featuringItemsNew);
    }
    this.featuringItemGroup = fg;
  }
}
function isFeatured(filterItems, index, array) {
  return (filterItems !== null && (parseInt(filterItems.rating, 10) > 4));
}
