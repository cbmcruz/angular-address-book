import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent implements OnInit {
  favorites!: Contact[];

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.getFavorites();
  }

  /**
   * Populates the favorites
   */
  getFavorites(): void {
    this.contactService
      .getContacts()
      .subscribe(
        (contacts) =>
          (this.favorites = contacts.filter((contact) => contact.favorite))
      );
  }
}
