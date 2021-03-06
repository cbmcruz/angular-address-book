import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contact';

@Pipe({
  name: 'sortContacts',
})
export class SortContactsPipe implements PipeTransform {
  /**
   * Sorts contacts in alphabetical order by first name
   * @param contacts - contacts to sort
   * @returns - sorted contacts
   */
  transform(contacts: Contact[]): Contact[] {
    if (!contacts) {
      return [];
    }
    return contacts.sort((a, b) => a.firstName.localeCompare(b.firstName));
  }
}
