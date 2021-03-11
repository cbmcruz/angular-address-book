import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoritesComponent } from './favorites/favorites.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { ContactEditComponent } from './contact-edit/contact-edit.component';
import { ContactCreateComponent } from './contact-create/contact-create.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/favorites', pathMatch: 'full' },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'detail/:id', component: ContactDetailComponent },
  { path: 'edit/:id', component: ContactEditComponent },
  { path: 'create', component: ContactCreateComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
