import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact';
import { ContactService } from '../contact.service';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { whitespaceValidator } from '../whitespace.directive';

@Component({
  selector: 'app-contact-create',
  templateUrl: './contact-create.component.html',
  styleUrls: ['./contact-create.component.css'],
})
export class ContactCreateComponent implements OnInit {
  firstName = new FormControl('', [Validators.required, whitespaceValidator()]);
  lastName = new FormControl('', [whitespaceValidator()]);
  nickname = new FormControl('', [whitespaceValidator()]);
  address = new FormControl('', [whitespaceValidator()]);
  email = new FormControl('', [Validators.email, whitespaceValidator()]);
  phone = new FormControl('', [
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(10),
  ]);
  favorite = new FormControl(false);

  constructor(
    private contactService: ContactService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.phone.valueChanges
      .pipe(
        startWith(''),
        map((value) => {
          if (!/^[0-9]+$/.test(value)) {
            if (value.length > 0) {
              this.phone.setValue(value.substring(0, value.length - 1));
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
    // firstName = firstName.trim();
    // if (!firstName) {
    //   return;
    // }
    // lastName = lastName.trim();
    // nickname = nickname.trim();
    // address = address.trim();
    // email = email.trim();
    // phone = phone.trim();
    // this.contactService
    //   .addContact({
    //     firstName,
    //     lastName,
    //     nickname,
    //     address,
    //     email,
    //     phone,
    //     favorite,
    //   } as Contact)
    //   .subscribe((contact) => {
    //     this.location.replaceState('/contacts');
    //     this.router.navigate(['/detail', contact.id]);
    //   });
    console.log(this.firstName.value);
    console.log(this.lastName.value);
    console.log(this.nickname.value);
    console.log(this.address.value);
    console.log(this.email.value);
    console.log(this.phone.value);
    console.log(this.favorite.value);
  }

  /**
   * Goes to previous page in history
   */
  goBack(): void {
    this.location.back();
  }
}
