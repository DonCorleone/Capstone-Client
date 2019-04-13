import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';
import { IItem, Item } from 'src/app/models/item';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Subcategory } from 'src/app/models/subcategory';
import { StockManipulator } from 'src/app/models/stockManipulator';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})

export class ProductPageComponent implements OnInit {

  constructor(
    private route: ActivatedRoute, private router: Router,
    private itemsService: ItemsService, private cartService: CartService) {

   }

  item$: Observable<IItem>;
  errors: string;
  itemId$: string;
  items: IItem[] = [];
  stockManipulator = this.cartService.stockManipulator;
  cart = this.cartService.cart;

  submitted = false;

  ngOnInit() {
    this.errors = '';
    this.stockManipulator.amount = 1;
    this.route.paramMap.subscribe(
      params =>
        this.loadItem(params.get('id'))
    );
  }

  onSubmit(item: IItem) {
    this.submitted = true;
    if (this.stockManipulator) {
      for (let ix = 0; ix < this.stockManipulator.amount; ix++) {
        this.cart.push(item);
      }
    }
  }
  onDecrementAmount() {
    this.stockManipulator.amount--; }
  onIncrementAmount() { this.stockManipulator.amount++; }

  loadItem(id: string) {

  this.itemsService.getItems()
    .subscribe(resp => {
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
      this.items = itemsLoop;

      const itemsFeatured = this.items.filter(item => item.name === id);
      this.item$ = of(itemsFeatured.length > 0 ? itemsFeatured[0] : null);
    });
  }
}

