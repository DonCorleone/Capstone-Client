import { Component, OnInit } from '@angular/core';
import { Carousel } from 'node_modules/bootstrap/js/src';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  stopCarousel() {
    ($('#carouselHeaders') as Carousel).carousel('pause');
  }

  startCarousel() {
    ($('#carouselHeaders') as Carousel).carousel({
      pause: false,
      interval: 1000
    });
  }
}
