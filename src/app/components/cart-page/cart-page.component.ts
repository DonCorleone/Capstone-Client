import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ICartItem } from 'src/app/models/cart-item';
import { ShippingDetail, IShippingDetail } from 'src/app/models/shipping-detail';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {

  constructor(private cartService: CartService) {

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

  onSubmit(shippingForm: IShippingDetail) {

    if  (shippingForm.FirstName === undefined) { // (!isValid) {
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
    this.cartService.decrementAmount(cartItem);
    this.onRecalculate();
  }
  onIncrementAmount(cartItem: ICartItem) {
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

}
