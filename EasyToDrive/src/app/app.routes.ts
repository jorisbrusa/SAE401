import { Routes } from '@angular/router';
import { MonEspaceSelectionComponent } from './component/mon-espace-selection/mon-espace-selection.component';
import { AccueilComponent } from './component/accueil/accueil.component';
import { FaqComponent } from './component/faq/faq.component';
import { ContactComponent } from './component/contact/contact.component';
import { MonEspaceConexionComponent } from './component/mon-espace-conexion/mon-espace-conexion.component';
import { MonEspaceConnexionAdminComponent } from './component/mon-espace-connexion-admin/mon-espace-connexion-admin.component';

export const routes: Routes = [
  { path: 'mon-espace', component: MonEspaceSelectionComponent, data: { animation: 'MonEspacePage' } },
  { path: 'faq', component: FaqComponent, data: { animation: 'FaqPage' } },
  { path: 'contact', component: ContactComponent, data: { animation: 'ContactPage' } },
  { path: 'accueil', component: AccueilComponent, data: { animation: 'AccueilPage' } },
  { path: 'mon-espace-connexion', component: MonEspaceConexionComponent, data: { animation: 'ConexionPage' } },
  { path: 'mon-espace-connexion-admin', component: MonEspaceConnexionAdminComponent, data: { animation: 'AdminPage' } },
  { path: '', redirectTo: '/accueil', pathMatch: 'full' }
];
