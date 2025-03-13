import { Routes } from '@angular/router';
import { MonEspaceSelectionComponent } from './component/mon-espace-selection/mon-espace-selection.component';
import { AccueilComponent } from './component/accueil/accueil.component';
import { FaqComponent } from './component/faq/faq.component';
import { ContactComponent } from './component/contact/contact.component';

export const routes: Routes = [
  { path: 'mon-espace', component: MonEspaceSelectionComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'accueil', component: AccueilComponent },
  { path: '', redirectTo: '/accueil', pathMatch: 'full' }
];
