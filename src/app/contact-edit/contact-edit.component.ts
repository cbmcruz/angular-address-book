import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ContactService } from '../contact.service';
import { Contact } from '../contact';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { whitespaceValidator } from '../whitespace.directive';
import { emailValidator } from '../email.directive';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css'],
})
export class ContactEditComponent implements OnInit {
  contact!: Contact;
  contactInfo!: FormGroup;

  get firstName() {
    return this.contactInfo.get('firstName')!;
  }
  get lastName() {
    return this.contactInfo.get('lastName')!;
  }
  get nickname() {
    return this.contactInfo.get('nickname')!;
  }
  get street() {
    return this.contactInfo.get('address')!.get('street')!;
  }
  get city() {
    return this.contactInfo.get('address')!.get('city')!;
  }
  get state() {
    return this.contactInfo.get('address')!.get('state')!;
  }
  get zip() {
    return this.contactInfo.get('address')!.get('zip')!;
  }
  get email() {
    return this.contactInfo.get('email')!;
  }
  get phone() {
    return this.contactInfo.get('phone')!;
  }
  get favorite() {
    return this.contactInfo.get('favorite')!;
  }

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
    this.contactService.getContact(id).subscribe((contact) => {
      this.contact = contact;
      this.setContactInfo();
    });
  }

  setContactInfo(): void {
    this.contactInfo = new FormGroup({
      firstName: new FormControl(this.contact.firstName, [
        Validators.required,
        whitespaceValidator(),
      ]),
      lastName: new FormControl(this.contact.lastName, [whitespaceValidator()]),
      nickname: new FormControl(this.contact.nickname, [whitespaceValidator()]),
      address: new FormGroup({
        street: new FormControl(this.contact.street, [whitespaceValidator()]),
        city: new FormControl(this.contact.city, [whitespaceValidator()]),
        state: new FormControl(this.contact.state, [whitespaceValidator()]),
        zip: new FormControl(this.contact.zip, [
          Validators.minLength(5),
          Validators.maxLength(5),
        ]),
      }),
      email: new FormControl(this.contact.email, [emailValidator()]),
      phone: new FormControl(this.contact.phone, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      favorite: new FormControl(this.contact.favorite),
    });
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
    this.contact.firstName = this.firstName.value.trim();
    this.contact.lastName = this.lastName.value.trim();
    this.contact.nickname = this.nickname.value.trim();
    this.contact.street = this.street.value.trim();
    this.contact.city = this.city.value.trim();
    this.contact.state = this.state.value.trim();
    this.contact.zip = this.zip.value;
    this.contact.email = this.email.value.trim();
    this.contact.phone = this.phone.value;
    this.contact.favorite = this.favorite.value;
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
