import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategory } from 'src/app/models/category';
import { FeaturingItems } from 'src/app/models/featuringitem';
import { IItem, Item } from 'src/app/models/item';
import { ISubcategory, Subcategory } from 'src/app/models/subcategory';
import { ItemsService } from 'src/app/services/items.service';
import { Carousel, Button } from '../../../../node_modules/bootstrap/js/dist';

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

  carouselXsToggled = true;
  carouselMdToggled = true;

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

              // Fix Items Subcategory and Category-Name due to issue;
              // tslint:disable-next-line:max-line-length
              // https://courses.edx.org/courses/course-v1:Microsoft+DEV238x+1T2019a/discussion/forum/course/threads/5cb872a6d8eab1094c000490

              item.subcategory = subcategory.name;
              item.category = category.category;

              itemsLoop.push(item);


            });
          });
        });

        // save collected subCategories
        this.subcategories = subcategoriesLoop;

        // save collected items
        this.items = shuffle(itemsLoop);

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
      const amountInGroup = getRandomInt(4) + 1;
      const featuringItemsNew = new FeaturingItems();
      for (let ixInner = 0; ixInner < amountInGroup; ixInner++) {

        featuringItemsNew.items.push(this.featuringItems[ix]);
        ix++;
      }
      fg.push(featuringItemsNew);
    }
    this.featuringItemGroup = fg;
  }

  toggleCarousel() {

    let carousel: Carousel = null;
    let toggler = false;
    let btn: Button = null;

    if ($('#carouselMd').is(':visible')) {
      carousel = $('#carouselMd');
      btn = $('#btnToggleCarouselMd');
      toggler = this.carouselMdToggled;
      this.carouselMdToggled = !this.carouselMdToggled;
    } else if ($('#carouselXs').is(':visible')) {
      carousel = $('#carouselXs');
      btn = $('#btnToggleCarouselXs');
      toggler = this.carouselXsToggled;
      this.carouselXsToggled = !this.carouselXsToggled;
    }

    if (!toggler) {
      carousel.carousel({
        pause: false,
        interval: 1000
      });
      $(btn).text('Stop Slide Show');
    } else {
      carousel.carousel('pause');
      $(btn).text('Start Slide Show');
    }
  }
}

/// Featured === 5 Star Rating
function isFeatured(filterItems, index, array) {
  return (filterItems !== null && (parseInt(filterItems.rating, 10) > 4));
}

/// Random Sort
function shuffle(array: IItem[]): IItem[] {
  return array.sort(() => Math.random() - 0.5);
}

// with each slide having between 1 and 4 product images.
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
