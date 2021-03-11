import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactService } from '../contact.service';
import { Contact } from '../contact';
import { Location } from '@angular/common';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css'],
})
export class ContactDetailComponent implements OnInit {
  contact!: Contact;

  constructor(
    private route: ActivatedRoute,
    private contactSerivce: ContactService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getContact();
  }

  getContact(): void {
    const id = +[this.route.snapshot.paramMap.get('id')];
    this.contactSerivce
      .getContact(id)
      .subscribe((contact) => (this.contact = contact));
  }

  goBack(): void {
    this.location.back();
  }
}
