import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContactRequest, IContactRequest } from 'src/app/models/contact-request';

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


  onSubmit(contactRequest: IContactRequest, contactForm: NgForm) {

    if (!contactForm.valid) { // (!isValid) {
      return; // Validation gets handled in Form
    } else {

      this.submitted = true;
      $('#modContact').modal('show');
    }
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }
  ngOnInit() {
  }

}
