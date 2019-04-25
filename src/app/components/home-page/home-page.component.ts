import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategory } from 'src/app/models/category';
import { FeaturingItems } from 'src/app/models/featuringitem';
import { IItem, Item } from 'src/app/models/item';
import { ISubcategory, Subcategory } from 'src/app/models/subcategory';
import { ItemsService } from 'src/app/services/items.service';

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

  carouselToggled = false;

  ngOnInit() {

    // load all items without providing a selected subCategory
    this.itemsService.getItems('')
      .subscribe(resp => {

        // save the categories
        this.categories = resp;

        const subcategoriesLoop: Subcategory[] = [];
        const itemsLoop: Item[] = [];

        this.categories.forEach(category => {

          category.subcategories.forEach(subcategory => {

            // collect all subcategories
            subcategoriesLoop.push(subcategory);

            // collect all items
            subcategory.items.forEach(item => {

              itemsLoop.push(item);
            });
          });
        });

        // save collected subCategories
        this.subcategories = subcategoriesLoop;

        // save collected items
        this.items = itemsLoop;

        // generate 'featured' item-collections
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

  startCarousel() {

    this.carouselToggled = !this.carouselToggled;

    // let carousel: any = null;
    // if ($('#carouselMd').is(':visible')) {
    //   carousel = $('#carouselMd');
    // } else if ($('#carouselXs').is(':visible')) {
    //   carousel = $('#carouselXs');
    // }

    if (this.carouselToggled) {
      ($('.carousel') as any).carousel({
        interval: 3000
      });
    } else {
      ($('.carousel') as any).carousel('pause');
    }
  }
}
function isFeatured(filterItems, index, array) {
  return (filterItems !== null && (parseInt(filterItems.rating, 10) > 4));
}
