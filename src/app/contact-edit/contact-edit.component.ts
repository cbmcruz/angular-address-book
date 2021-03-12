import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ContactService } from '../contact.service';
import { Contact } from '../contact';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css'],
})
export class ContactEditComponent implements OnInit {
  contact!: Contact;

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getContact();
  }

  /**
   * Populates the contact
   */
  getContact(): void {
    const id = +[this.route.snapshot.paramMap.get('id')];
    this.contactService
      .getContact(id)
      .subscribe((contact) => (this.contact = contact));
  }

  /**
   * Goes to previous page in history
   */
  goBack(): void {
    this.location.back();
  }

  /**
   * Saves the contact information
   */
  save(): void {
    this.contactService
      .updateContact(this.contact)
      .subscribe(() => this.goBack());
  }

  /**
   * Deletes the contact
   * @param contact - contact to delete
   */
  delete(contact: Contact): void {
    this.contactService
      .deleteContact(contact)
      .subscribe(() => this.router.navigate(['/contacts']));
  }
}
