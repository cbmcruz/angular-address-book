import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Contact } from './contact';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private contactsUrl = 'api/contacts';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  /**
   * Gets all contacts
   * @returns - contacts from dummy server
   */
  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.contactsUrl).pipe(
      tap((_) => this.log('fetched contacts')),
      catchError(this.handleError<Contact[]>('getContacts', []))
    );
  }

  /**
   * Gets the contact with the provided id
   * @param id - the id of the contact to get
   * @returns - contact with id or undefined if not found
   */
  getContactNo404(id: number): Observable<Contact> {
    const url = `${this.contactsUrl}/?id=${id}`;
    return this.http.get<Contact[]>(url).pipe(
      map((contacts) => contacts[0]),
      tap((h) => {
        const outcome = h ? 'fetched' : 'did not find';
        this.log(`${outcome} hero id=${id}`);
      }),
      catchError(this.handleError<Contact>(`getContact id=${id}`))
    );
  }

  /**
   * Gets the contact with the provided id
   * @param id - the id of the contact to get
   * @returns - contact with id or 404 if not found
   */
  getContact(id: number): Observable<Contact> {
    const url = `${this.contactsUrl}/${id}`;
    return this.http.get<Contact>(url).pipe(
      tap((_) => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Contact>(`getContact id=${id}`))
    );
  }

  /**
   * Gets the contacts whose first name contains the seach term
   * @param term - the search term
   * @returns - contacts whose first name contains the seach term
   */
  searchContacts(term: string): Observable<Contact[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http
      .get<Contact[]>(`${this.contactsUrl}/?firstName=${term}`)
      .pipe(
        tap((x) =>
          x.length
            ? this.log(`found contacts matching "${term}"`)
            : this.log(`no contacts matching "${term}"`)
        ),
        catchError(this.handleError<Contact[]>('searchContacts', []))
      );
  }

  /**
   * Adds a contact to the dummy server
   * @param contact - the contact to add
   * @returns - the added contact with id
   */
  addContact(contact: Contact): Observable<Contact> {
    return this.http
      .post<Contact>(this.contactsUrl, contact, this.httpOptions)
      .pipe(
        tap((newContact: Contact) =>
          this.log(`added contact with id=${newContact.id}`)
        ),
        catchError(this.handleError<Contact>('addContact'))
      );
  }

  /**
   * Deletes a contact from the dummy server
   * @param contact - the contact to delete
   * @returns - the deleted contact
   */
  deleteContact(contact: Contact | number): Observable<Contact> {
    const id = typeof contact === 'number' ? contact : contact.id;
    const url = `${this.contactsUrl}/${id}`;

    return this.http.delete<Contact>(url, this.httpOptions).pipe(
      tap((_) => this.log(`deleted contact id=${id}`)),
      catchError(this.handleError<Contact>('deleteContact'))
    );
  }

  /**
   * Updates a contact on the dummy server
   * @param contact - the contact to update
   * @returns - the updated contact
   */
  updateContact(contact: Contact): Observable<any> {
    return this.http.put(this.contactsUrl, contact, this.httpOptions).pipe(
      tap((_) => this.log(`updated hero id=${contact.id}`)),
      catchError(this.handleError<any>('updateContact'))
    );
  }

  /**
   * Handles errors from failed Http operations. Allows the app to continue running
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   * @returns - the provided result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  /**
   * Logs a message
   * @param message - message to log
   */
  private log(message: string) {
    this.messageService.add(`ContactService: ${message}`);
  }
}
