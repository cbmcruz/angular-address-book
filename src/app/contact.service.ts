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

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.contactsUrl).pipe(
      tap((_) => this.log('fetched contacts')),
      catchError(this.handleError<Contact[]>('getContacts', []))
    );
  }

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

  getContact(id: number): Observable<Contact> {
    const url = `${this.contactsUrl}/${id}`;
    return this.http.get<Contact>(url).pipe(
      tap((_) => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Contact>(`getContact id=${id}`))
    );
  }

  searchContact(term: string): Observable<Contact[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Contact[]>(`${this.contactsUrl}/?name=${term}`).pipe(
      tap((x) =>
        x.length
          ? this.log(`found contacts matching "${term}"`)
          : this.log(`no contacts matching "${term}"`)
      ),
      catchError(this.handleError<Contact[]>('searchContacts', []))
    );
  }

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

  deleteContact(contact: Contact | number): Observable<Contact> {
    const id = typeof contact === 'number' ? contact : contact.id;
    const url = `${this.contactsUrl}/${id}`;

    return this.http.delete<Contact>(url, this.httpOptions).pipe(
      tap((_) => this.log(`deleted contact id=${id}`)),
      catchError(this.handleError<Contact>('deleteContact'))
    );
  }

  updateContact(contact: Contact): Observable<any> {
    return this.http.put(this.contactsUrl, contact, this.httpOptions).pipe(
      tap((_) => this.log(`updated hero id=${contact.id}`)),
      catchError(this.handleError<any>('updateContact'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`ContactService: ${message}`);
  }
}
