import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ICartItem } from 'src/app/models/cart-item';
import { ShippingDetail, IShippingDetail } from 'src/app/models/shipping-detail';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IItem } from 'src/app/models/item';


@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {

  constructor(
    private router: Router,
    private cartService: CartService) {

  }

  cart = this.cartService.cart;
  subTotal = this.cartService.subTotal;
  shipping = this.cartService.shipping;
  taxRate = this.cartService.taxRate;
  tax = this.cartService.tax;
  cartTotal = this.cartService.cartTotal;
  shippingDetail: IShippingDetail = null;
  submitted = false;

  ngOnInit() {
    if (this.shippingDetail == null) {
      this.shippingDetail = new ShippingDetail();
    }
  }

  onSubmit(shippingDetail: IShippingDetail, shippingForm: NgForm) {

    if (!shippingForm.valid) { // (!isValid) {
      return; // Validation gets handled in Form
    } else {

      this.submitted = true;

      // tslint:disable:space-before-function-paren
      // tslint:disable-next-line:only-arrow-functions
      $(function () {

        // tslint:disable-next-line:only-arrow-functions
        $('#checkoutAlert').removeAttr('hidden');
      });
    }
  }

  onDecrementAmount(cartItem: ICartItem) {
    if (cartItem.amount < 1) {
      $('#notAllowedAlert').removeAttr('hidden');
      return;
    }
    this.cartService.decrementAmount(cartItem);
    this.onRecalculate();
  }
  onIncrementAmount(cartItem: ICartItem) {
    if (cartItem.amount >= Number.parseInt(cartItem.stock, 10)) {
      $('#outOfStockAlert').removeAttr('hidden');
      return;
    }

    this.cartService.incrementAmount(cartItem);
    this.onRecalculate();
  }

  onRemoveEntry(cartItem: ICartItem) {
    this.cartService.removeEntry(cartItem);
    this.onRecalculate();
  }

  onRecalculate() {
    this.subTotal = this.cartService.subTotal;
    this.shipping = this.cartService.shipping;
    this.taxRate = this.cartService.taxRate;
    this.tax = this.cartService.tax;
    this.cartTotal = this.cartService.cartTotal;
  }

  goToProduct(cartItem: ICartItem) {

    this.router.navigate(['/product/' + cartItem.name, { id: cartItem.name, comingFrom: 'cart', amount: cartItem.amount }]);
  }
}
