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
        address: '123 Maple Road',
        email: 'bob@gmail.com',
        phone: '8019998888',
        favorite: true,
      },
      {
        id: 1,
        firstName: 'Jane',
        lastName: 'Johnson',
        nickname: 'JJ',
        address: '123 Alpine Road',
        email: 'jane@gmail.com',
        phone: '8015554444',
        favorite: true,
      },
      {
        id: 2,
        firstName: 'Grace',
        lastName: 'Williams',
        nickname: '',
        address: '123 Birch Road',
        email: 'grace@gmail.com',
        phone: '8017771111',
        favorite: true,
      },
      {
        id: 3,
        firstName: 'Eric',
        lastName: 'Jobs',
        nickname: '',
        address: '123 Spruce Road',
        email: 'eric@gmail.com',
        phone: '8013332222',
        favorite: true,
      },
      {
        id: 4,
        firstName: 'Shelly',
        lastName: 'Smith',
        nickname: '',
        address: '123 Oak Road',
        email: 'shelly@gmail.com',
        phone: '8013332211',
        favorite: true,
      },
      {
        id: 5,
        firstName: 'James',
        lastName: 'Smith',
        nickname: '',
        address: '123 Oak Road',
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
