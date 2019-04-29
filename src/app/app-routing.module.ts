import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ShoppingPageComponent } from './components/shopping-page/shopping-page.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { AboutUsPageComponent } from './components/about-us-page/about-us-page.component';
import { ContactUsPageComponent } from './components/contact-us-page/contact-us-page.component';

const appRoutes: Routes = [
  {
    path: 'home',
    component: HomePageComponent,
    data: { title: 'Home Page' }
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'shopping',
    component: ShoppingPageComponent,
    data: {
      title: 'Shopping Page'
    }
  },
  {
    path: 'product/:id', // rubric46 The product page is accessible at http://localhost:8080/#/product?name=productname
    component: ProductPageComponent,
    data: {
      title: 'Product Page'
    }
  },
  {
    path: 'cart',
    component: CartPageComponent,
    data: {
      title: 'Cart Page'
    }
  },
  {
    path: 'about',
    component: AboutUsPageComponent,
    data: {
      title: 'About Us Page'
    }
  },
  {
    path: 'contact',
    component: ContactUsPageComponent,
    data: {
      title: 'Product Page'
    }
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
