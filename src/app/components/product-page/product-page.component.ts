import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';
import { IItem, Item } from 'src/app/models/item';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Subcategory } from 'src/app/models/subcategory';
import { Location } from '@angular/common';
import { CartService } from 'src/app/services/cart.service';
import { StockManipulator } from 'src/app/models/stockManipulator';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})

export class ProductPageComponent implements OnInit {
  comingFrom: any;

  constructor(
    private route: ActivatedRoute, private router: Router,
    private itemsService: ItemsService, private cartService: CartService,
    private location: Location) {
  }

  item$: Observable<IItem>;
  errors: string;
  itemId$: string;
  currentStock = -1;
  items: IItem[] = [];
  stockManipulator = this.cartService.stockManipulator;

  submitted = false;

  ngOnInit() {
    this.errors = '';
    this.stockManipulator.amount = 1;
    this.route.paramMap.subscribe(
      params => {
        this.comingFrom = params.get('comingFrom');
        this.loadItem(params.get('id'));
        this.setStockManipulator(params.get('amount'));
      }
    );
  }
  setStockManipulator(amount: string) {
    if (amount == null) {
     // this.stockManipulator.amount = 1;
    } else {
      this.stockManipulator.amount = Number.parseInt(amount, 10);
    }
  }

  onSubmit(item: IItem) {
    this.submitted = true;

    // Anything chosen?
    if (this.stockManipulator) {

      if (Number.parseInt(item.stock, 10) === 0) {
        $('#outOfStockAlert').removeAttr('hidden');
        return;
      }

      this.cartService.createOrUpdateCartItem(item, this.stockManipulator.amount);
    }
  }

  onDecrementAmount(item: IItem) {

    if (this.stockManipulator.amount < 1) {
      $('#notAllowedAlert').removeAttr('hidden');
      return;
    }

    this.stockManipulator.amount--;
    // let stockNumber = Number.parseInt(item.stock, 10);

    this.currentStock++;
    // item.stock = stockNumber.toString();

  }
  onIncrementAmount(item: IItem) {
    // let stockNumber = Number.parseInt(item.stock, 10);
    if (this.currentStock === 0) {
      $('#outOfStockAlert').removeAttr('hidden');
      return;
    }

    if (this.currentStock < 0) {
      this.currentStock = Number.parseInt(item.stock, 10);
    }

    if (Number.parseInt(item.stock, 10) === 0) {
      $('#outOfStockAlert').removeAttr('hidden');
      return;
    }

    if (Number.parseInt(item.stock, 10) < this.stockManipulator.amount + 1) {
      $('#outOfStockAlert').removeAttr('hidden');
      return;
    }

    this.stockManipulator.amount++;
    this.currentStock--;
    //  item.stock = stockNumber.toString();

  }

  loadItem(id: string) {

    this.itemsService.getItems('')
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

        // this.onIncrementAmount(itemsFeatured.length > 0 ? itemsFeatured[0] : null);
      });
  }

  onBackClick() {
    this.item$.subscribe(res =>
      this.router.navigate(['/' + this.comingFrom, { id: res.name, subcategory: res.subcategory }]));
  }
}

