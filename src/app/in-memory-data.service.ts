import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Contact } from './contact';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  /**
   * Populates initial contacts
   * @returns - starting contacts
   */
  createDb() {
    const contacts = [
      {
        id: 0,
        firstName: 'Bob',
        lastName: 'Mann',
        nickname: 'Bobby',
        street: '123 Maple Road',
        city: '',
        state: 'Utah',
        zip: '84093',
        email: 'bob@gmail.com',
        phone: '8019998888',
        favorite: true,
      },
      {
        id: 1,
        firstName: 'Jane',
        lastName: 'Johnson',
        nickname: 'JJ',
        street: '123 Alpine Road',
        city: 'Sandy',
        state: 'Utah',
        zip: '84094',
        email: 'jane@gmail.com',
        phone: '8015554444',
        favorite: true,
      },
      {
        id: 2,
        firstName: 'Grace',
        lastName: 'Williams',
        nickname: '',
        street: '123 Birch Road',
        city: 'Sandy',
        state: '',
        zip: '84093',
        email: 'grace@gmail.com',
        phone: '8017771111',
        favorite: true,
      },
      {
        id: 3,
        firstName: 'Eric',
        lastName: 'Jobs',
        nickname: '',
        street: '123 Spruce Road',
        city: 'Salt Lake City',
        state: 'Utah',
        zip: '84101',
        email: 'eric@gmail.com',
        phone: '8013332222',
        favorite: true,
      },
      {
        id: 4,
        firstName: 'Shelly',
        lastName: 'Smith',
        nickname: '',
        street: '123 Oak Road',
        city: '',
        state: '',
        zip: '84095',
        email: 'shelly@gmail.com',
        phone: '8013332211',
        favorite: true,
      },
      {
        id: 5,
        firstName: 'James',
        lastName: 'Smith',
        nickname: '',
        street: '123 Oak Road',
        city: '',
        state: 'Utah',
        zip: '84095',
        email: 'james@gmail.com',
        phone: '8013322211',
        favorite: false,
      },
    ];
    return { contacts };
  }

  /**
   * Generates the id for a new contact
   * @param contacts - existing contacts
   * @returns - the id for the new contact
   */
  genId(contacts: Contact[]): number {
    return contacts.length > 0
      ? Math.max(...contacts.map((contact) => contact.id)) + 1
      : 0;
  }
}
