import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';
import { ICategory } from 'src/app/models/category';
import { ISubcategory, Subcategory } from 'src/app/models/subcategory';
import { IItem, Item } from 'src/app/models/item';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private service: ItemsService
  ) { }

  item$: Observable<IItem>;
  errors: string;
  itemId$: string;

  ngOnInit() {
    this.errors = '';


    // this.item$ = this.service.getItem('id');

    this.item$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service.getItemMock(params.get('id')))
    );
  }

  // private getTheShit() {
  //   this.service.getItems().subscribe(resp => {
  //     // const subcategoriesLoop: Subcategory[] = [];
  //     // const itemsLoop: Item[] = [];
  //     resp.forEach(category => {
  //       category.subcategories.forEach(subcategory => {
  //         //      subcategoriesLoop.push(subcategory);
  //         for (const itemLoop of subcategory.items) {
  //           if (itemLoop.name === this.itemId$) {
  //             this.item$ = itemLoop;
  //             break;
  //           }
  //         }
  //       });
  //     });
  //   });
  // }
}
