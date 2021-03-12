import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact';
import { ContactService } from '../contact.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-create',
  templateUrl: './contact-create.component.html',
  styleUrls: ['./contact-create.component.css'],
})
export class ContactCreateComponent implements OnInit {
  constructor(
    private contactService: ContactService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {}

  /**
   * Adds a new contact
   * @param firstName - the first name of the new contact
   * @param lastName - the last name of the new contact
   * @param nickname - the nickname of the new contact
   * @param address - the address of the new contact
   * @param email - the email of the new contact
   * @param phone - the phone number of the new contact
   * @param favorite - if the new contact is a favorite
   */
  add(
    firstName: string,
    lastName: string,
    nickname: string,
    address: string,
    email: string,
    phone: string,
    favorite: boolean
  ): void {
    firstName = firstName.trim();
    if (!firstName) {
      return;
    }
    lastName = lastName.trim();
    nickname = nickname.trim();
    address = address.trim();
    email = email.trim();
    phone = phone.trim();
    this.contactService
      .addContact({
        firstName,
        lastName,
        nickname,
        address,
        email,
        phone,
        favorite,
      } as Contact)
      .subscribe((contact) => {
        this.location.replaceState('/contacts');
        this.router.navigate(['/detail', contact.id]);
      });
  }

  /**
   * Goes to previous page in history
   */
  goBack(): void {
    this.location.back();
  }
}
