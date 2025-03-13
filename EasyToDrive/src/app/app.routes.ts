import { Routes } from '@angular/router';
import { MonEspaceSelectionComponent } from './component/mon-espace-selection/mon-espace-selection.component';
import { AccueilComponent } from './component/accueil/accueil.component';
import { FaqComponent } from './component/faq/faq.component';
import { ContactComponent } from './component/contact/contact.component';
import { MonEspaceConexionComponent } from './component/mon-espace-conexion/mon-espace-conexion.component';
import { MonEspaceConnexionAdminComponent } from './component/mon-espace-connexion-admin/mon-espace-connexion-admin.component';

export const routes: Routes = [
  { path: 'mon-espace', component: MonEspaceSelectionComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'accueil', component: AccueilComponent },
  { path: 'mon-espace-connexion', component: MonEspaceConexionComponent },
  { path: 'mon-espace-connexion-admin', component: MonEspaceConnexionAdminComponent },
  { path: '', redirectTo: '/accueil', pathMatch: 'full' }
];
