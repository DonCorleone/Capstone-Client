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
  display = 'none';

  constructor() { }


  onSubmit(contactRequest: IContactRequest, contactForm: NgForm) {

    if (!contactForm.valid) { // (!isValid) {
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

  ngOnInit() {
  }
}
