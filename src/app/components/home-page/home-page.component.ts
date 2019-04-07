import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';
import { Category, ICategory } from 'src/app/models/category';
import { Config } from 'protractor';
import { observable, Observable } from 'rxjs';
import { Subcategory, ISubcategory } from 'src/app/models/subcategory';
import { Item, IItem } from 'src/app/models/item';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private itemsService: ItemsService) { }

  categories: ICategory [] = [];
  subcategories: ISubcategory[] = [];
  items: IItem[] = [];

  headers: string[];

  // config: Config;

  ngOnInit() {

    this.showItems();
    // this.showConfig();
    // this.showConfigResponse();
    // this.readGitHubUser();
    this.showNada();
  }

  showNada() {
    console.log(this.categories);
  }
  showItems() {
    this.itemsService.getItems()
      // resp is of type `HttpResponse<Config>`
      .subscribe(resp => {
        // access the body directly, which is typed as `Config`.
        this.categories = resp;
        const subcategoriesLoop: Subcategory[] = [];
        const itemsLoop: Item[] = [];

        this.categories.forEach(category => {


          console.log(category.category);
          category.subcategories.forEach(subcategory => {

            subcategoriesLoop.push(subcategory);

            console.log(subcategory.name);
            subcategory.items.forEach(item => {

              itemsLoop.push(item);
              console.log(item.name);
              console.log(item.rating);
            });
          });
        });
        this.subcategories = subcategoriesLoop;
        this.items = itemsLoop;
      });
  }

  // showConfig() {
  //   this.itemsService.getConfig()
  //     // clone the data object, using its known Config shape
  //     .subscribe((data: Config) => this.config = { ...data });
  // }

  // showConfigResponse() {
  //   this.itemsService.getConfigResponse()
  //     // resp is of type `HttpResponse<Config>`
  //     .subscribe(resp => {
  //       // display its headers
  //       const keys = resp.headers.keys();
  //       this.headers = keys.map(key =>
  //         `${key}: ${resp.headers.get(key)}`);

  //       // access the body directly, which is typed as `Config`.
  //       this.config = { ...resp.body };
  //     });
  // }

  // readGitHubUser() {
  //   this.itemsService.readGitHubUser();
  // }
}
