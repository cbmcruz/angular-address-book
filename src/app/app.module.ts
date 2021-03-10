import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { ContactSearchComponent } from './contact-search/contact-search.component';
import { ContactsComponent } from './contacts/contacts.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './app-routing.module';
import { ContactEditComponent } from './contact-edit/contact-edit.component';
import { ContactCreateComponent } from './contact-create/contact-create.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactDetailComponent,
    ContactSearchComponent,
    ContactsComponent,
    FavoritesComponent,
    MessagesComponent,
    ContactEditComponent,
    ContactCreateComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
