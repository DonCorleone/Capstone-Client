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

    if (!contactForm.valid) {
      // rubric61 : The form should show validation errors if the form isn’t filled out correctly and the send button is pressed
      return; // Validation itself and markup gets handled in HTML-Form
    } else {

      this.submitted = true;
      this.openModal();
    }
  }

  openModal() {
    // rubric 60 : The send button should create an alert based on the message sent
    this.display = 'block';
  }

  onCloseHandled() {
    this.display = 'none';
  }

  ngOnInit() {
  }
}
