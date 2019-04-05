import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';
import { Category } from 'src/app/models/category';
import { Config } from 'protractor';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private itemsService: ItemsService) { }

  categories: Category[] = [];
  headers: string[];

  config: Config;

  ngOnInit() {

    this.showItems();
    // this.showConfig();
    // this.showConfigResponse();
    // this.readGitHubUser();
  }

  showItems() {
    this.itemsService.getItems()
      // resp is of type `HttpResponse<Config>`
      .subscribe(resp => {
        // access the body directly, which is typed as `Config`.
        this.categories = resp;
        this.categories.forEach(category => {
          console.log(category.category);
          category.subcategories.forEach(subcategory => {
            console.log(subcategory.name);
            subcategory.items.forEach(item => {
              console.log(item.name);
              console.log(item.rating);
            });
          });
        });
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
