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
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SortContactsPipe } from './sort-contacts.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ContactDetailComponent,
    ContactSearchComponent,
    ContactsComponent,
    FavoritesComponent,
    MessagesComponent,
    ContactEditComponent,
    ContactCreateComponent,
    PageNotFoundComponent,
    SortContactsPipe,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false,
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
