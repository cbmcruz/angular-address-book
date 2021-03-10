import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Contact } from './contact';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const contacts = [
      {
        id: 0,
        name: 'Bob',
        address: '123 Maple Road',
        email: 'bob@gmail.com',
        phone: '8019998888',
        favorite: false,
      },
      {
        id: 1,
        name: 'Jane',
        address: '123 Alpine Road',
        email: 'jane@gmail.com',
        phone: '8015554444',
        favorite: false,
      },
      {
        id: 2,
        name: 'Grace',
        address: '123 Birch Road',
        email: 'grace@gmail.com',
        phone: '8017771111',
        favorite: false,
      },
      {
        id: 3,
        name: 'Eric',
        address: '123 Spruce Road',
        email: 'eric@gmail.com',
        phone: '8013332222',
        favorite: false,
      },
    ];
    return { contacts };
  }

  genId(contacts: Contact[]): number {
    return contacts.length > 0
      ? Math.max(...contacts.map((contact) => contact.id)) + 1
      : 0;
  }
}
