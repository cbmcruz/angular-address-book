import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Contact } from '../contact';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ContactsComponent implements OnInit {
  contacts!: Contact[];
  filter = new FormControl('');

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.getContacts();
  }

  /**
   * Populates the contacts
   */
  getContacts(): void {
    this.contactService.getContacts().subscribe((contacts) =>
      this.filter.valueChanges
        .pipe(
          startWith(''),
          map((text) => {
            return contacts.filter((contact) => {
              const term = text.toLowerCase();
              return contact.firstName.toLowerCase().includes(term);
            });
          })
        )
        .subscribe((filteredContacts) => (this.contacts = filteredContacts))
    );
  }
}
