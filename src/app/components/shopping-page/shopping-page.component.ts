import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ICategory } from 'src/app/models/category';
import { IItem } from 'src/app/models/item';
import { ISubcategory } from 'src/app/models/subcategory';
import { CartService } from 'src/app/services/cart.service';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-shopping-page',
  templateUrl: './shopping-page.component.html',
  styleUrls: ['./shopping-page.component.scss']
})
export class ShoppingPageComponent implements OnInit {

  categories$: Observable<ICategory[]>;
  subcategories$: Observable<ISubcategory[]>;
  filteredItems: IItem[];
  itemsInCategory: IItem[];
  itemsStock: IItem[];
  subcategoryNameExternal: string;

  // tslint:disable-next-line:variable-name
  private _selectedCategory: ICategory;
  public get selectedCategory(): ICategory {
    return this._selectedCategory;
  }
  public set selectedCategory(value: ICategory) {
    this._selectedCategory = value;
    this.selectedSubcategory = null;
    this.selectedItem$ = null;
  }
  // tslint:disable-next-line:variable-name
  private _selectedSubcategory: ISubcategory;
  public get selectedSubcategory(): ISubcategory {
    return this._selectedSubcategory;
  }
  public set selectedSubcategory(value: ISubcategory) {
    this._selectedSubcategory = value;
    this.selectedItem$ = null;

    // If Window <= XS > Collapse automatically
    if (value != null && window.innerWidth < 576) {
      $('#collapseAccordion').removeClass('show');
      $('#btnCollapseCategories').text('Show Categories');

      $('#collapseFilter').removeClass('show');
      $('#btnCollapseFilter').text('Show Filter');
     }


    this.LoadOrFilterItems('');
  }

  selectedItem$: IItem;
  selectedId: number;

  oderByItems: string[] = [];
  orderBy: string;
  stockOnly = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemsService: ItemsService,
    private cartService: CartService
    ) {
  }

  ngOnInit() {

    this.oderByItems = ['Alphabetical', 'Price', 'Rating'];

    this.route.paramMap.subscribe(
      params => {
        this.LoadOrFilterItems(params.get('subcategory'));
      }
    );
  }

  LoadOrFilterItems(subcategoryNameExternal: string) {

    this.subcategoryNameExternal = subcategoryNameExternal;

    if (this.selectedSubcategory != null) {

      const subcategoryName = this.selectedSubcategory.name.toLowerCase();

      this.itemsInCategory = this.itemsStock
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

      this.filteredItems = this.itemsInCategory
        .filter(itemInStock2 =>
          (this.stockOnly && itemInStock2.stock !== '0') || !this.stockOnly);
      // exit function
      return;
    }

    if (this.selectedCategory != null) {

      const categoryName = this.selectedCategory.category.toLowerCase();
      this.itemsInCategory = this.itemsStock
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
      this.filteredItems = this.itemsInCategory
        .filter(itemInStock2 =>
          (this.stockOnly && itemInStock2.stock !== '0') || !this.stockOnly);
      // exit function
      return;
    }

    this.itemsService.getItems(subcategoryNameExternal)
      .subscribe(resp => {

        const subcategoriesLoop: ISubcategory[] = [];
        const itemsLoop: IItem[] = [];

        let subcategoryExternal: ISubcategory = null;
        let categoryExternal: ICategory = null;

        resp.forEach(category => {
          category.subcategories.forEach(subcategory => {
            // grab each categories' subcategories

            if (subcategory.name === category.subcategoryNameExternal) {
              // gotcha!
              subcategoryExternal = subcategory;
              categoryExternal = category;
            }
            subcategoriesLoop.push(subcategory);
            subcategory.items.forEach(item => {

              // grab items of each subcategory

              // Fix Items Subcategory and Category-Name due to issue;
              // tslint:disable-next-line:max-line-length
              // https://courses.edx.org/courses/course-v1:Microsoft+DEV238x+1T2019a/discussion/forum/course/threads/5cb872a6d8eab1094c000490

              item.subcategory = subcategory.name;
              item.category = category.category;
              itemsLoop.push(item);
            });
          });
        });

        // save member
        this.categories$ = of(resp);
        this.subcategories$ = of(subcategoriesLoop);
        this.itemsStock = itemsLoop;
        this.itemsInCategory = itemsLoop;
        if (subcategoryExternal !== null) {
          this.selectedCategory = categoryExternal;
          this.selectedSubcategory = subcategoryExternal;
        }
      }
      );
  }


  goToProduct(name: string) {
    // rubric46 The product page is accessible at http://localhost:8080/#/product?name=productname
    this.router.navigate(['/product/' + name, { id: name, comingFrom: 'shopping' }]);
  }

  setOrderBy(orderBy: string) {
    this.orderBy = orderBy === 'Alphabetical' ? 'name' : orderBy.toLowerCase();
    this.LoadOrFilterItems('');
  }

  changeStockOnly() {
    this.stockOnly = !this.stockOnly;
    this.LoadOrFilterItems('');
  }

  addToCart(item: IItem) {
    this.cartService.createOrUpdateCartItem(item);
  }

  collapseFilter() {
    if ($('#btnCollapseFilter').text().indexOf('how') > 0) {
      $('#btnCollapseFilter').text('Collapse Filter');
    } else {
      $('#btnCollapseFilter').text('Show Filter');
    }
  }
  collapseCategories() {
    if ($('#btnCollapseCategories').text().indexOf('how') > 0) {
      $('#btnCollapseCategories').text('Collapse Categories');
    } else {
      $('#btnCollapseCategories').text('Show Categories');
    }
  }
}
