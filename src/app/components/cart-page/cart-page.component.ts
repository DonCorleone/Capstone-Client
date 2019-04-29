import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ICartItem } from 'src/app/models/cart-item';
import { IShippingDetail, ShippingDetail } from 'src/app/models/shipping-detail';
import { CartService } from 'src/app/services/cart.service';

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
  display = 'none';

  ngOnInit() {
    if (this.shippingDetail == null) {
      this.shippingDetail = new ShippingDetail();
    }

    $(window).resize(go => {
      // tslint:disable-next-line:prefer-const
      if ($(window).width() < 768) {
        $('#tblCart').addClass('table-sm');
      } else {
        $('#tblCart').removeClass('table-sm');
      }
    });
  }

  onSubmit(shippingDetail: IShippingDetail, shippingForm: NgForm) {

    if (!shippingForm.valid) { // (!isValid) {
      return; // Validation gets handled in Form
    } else {

      this.submitted = true;
      this.openModal();
    }
  }

  openModal() {
    this.display = 'block';
  }

  onCloseHandled() {
    this.display = 'none';
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
