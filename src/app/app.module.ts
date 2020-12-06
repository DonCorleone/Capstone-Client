import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ShoppingPageComponent } from './components/shopping-page/shopping-page.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { AboutUsPageComponent } from './components/about-us-page/about-us-page.component';
import { ContactUsPageComponent } from './components/contact-us-page/contact-us-page.component';
import { ImgFallbackDirective } from './directives/img-fallback.directive';
import * as $ from 'jquery';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    NotFoundComponent,
    ShoppingPageComponent,
    CartPageComponent,
    ProductPageComponent,
    AboutUsPageComponent,
    ContactUsPageComponent,
    ImgFallbackDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
