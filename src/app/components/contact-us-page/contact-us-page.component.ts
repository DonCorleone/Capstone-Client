import { Component, OnInit } from '@angular/core';
import { ContactRequest } from 'src/app/models/contact-request';

@Component({
  selector: 'app-contact-us-page',
  templateUrl: './contact-us-page.component.html',
  styleUrls: ['./contact-us-page.component.scss']
})
export class ContactUsPageComponent implements OnInit {

  subjects = ['Compliments', 'Issues', 'Questions', 'Others'];

  submitted = false;
  model = new ContactRequest('', '', this.subjects[0], '');

  constructor() { }


  onSubmit() { this.submitted = true; }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }
  ngOnInit() {
  }

}
