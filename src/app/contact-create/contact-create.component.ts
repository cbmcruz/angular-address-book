import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact';
import { ContactService } from '../contact.service';
import { Router } from '@angular/router';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { whitespaceValidator } from '../whitespace.directive';
import { emailValidator } from '../email.directive';

@Component({
  selector: 'app-contact-create',
  templateUrl: './contact-create.component.html',
  styleUrls: ['./contact-create.component.css'],
})
export class ContactCreateComponent implements OnInit {
  contactInfo = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      whitespaceValidator(),
    ]),
    lastName: new FormControl('', [whitespaceValidator()]),
    nickname: new FormControl('', [whitespaceValidator()]),
    address: new FormGroup({
      street: new FormControl('', [whitespaceValidator()]),
      city: new FormControl('', [whitespaceValidator()]),
      state: new FormControl('', [whitespaceValidator()]),
      zip: new FormControl('', [
        Validators.minLength(5),
        Validators.maxLength(5),
      ]),
    }),
    email: new FormControl('', [emailValidator()]),
    phone: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
    ]),
    favorite: new FormControl(false),
  });
  submitted = false;

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
    private contactService: ContactService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.digitsOnly(this.zip);
    this.digitsOnly(this.phone);
  }

  digitsOnly(control: AbstractControl): void {
    control.valueChanges
      .pipe(
        startWith(''),
        map((value) => {
          if (!/^[0-9]+$/.test(value)) {
            if (value.length > 0) {
              control.setValue(value.substring(0, value.length - 1));
            }
          }
        })
      )
      .subscribe();
  }

  /**
   * Adds a new contact
   */
  add(): void {
    this.submitted = true;
    const firstName = this.firstName.value.trim();
    const lastName = this.lastName.value.trim();
    const nickname = this.nickname.value.trim();
    const street = this.street.value.trim();
    const city = this.city.value.trim();
    const state = this.state.value.trim();
    const zip = this.zip.value;
    const email = this.email.value.trim();
    const phone = this.phone.value;
    const favorite = this.favorite.value;
    this.contactService
      .addContact({
        firstName,
        lastName,
        nickname,
        street,
        city,
        state,
        zip,
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
