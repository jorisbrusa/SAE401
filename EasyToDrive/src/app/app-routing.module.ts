import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'mon-espace', loadComponent: () => import('./component/mon-espace-selection/mon-espace-selection.component').then(m => m.MonEspaceSelectionComponent) },
  { path: 'faq', loadComponent: () => import('./component/faq/faq.component').then(m => m.FaqComponent) },
  { path: 'contact', loadComponent: () => import('./component/contact/contact.component').then(m => m.ContactComponent) },
  { path: 'accueil', loadComponent: () => import('./component/accueil/accueil.component').then(m => m.AccueilComponent) },
  { path: 'mon-espace-connexion', loadComponent: () => import('./component/mon-espace-conexion/mon-espace-conexion.component').then(m => m.MonEspaceConexionComponent) },
  { path: 'mon-espace-connexion-admin', loadComponent: () => import('./component/mon-espace-connexion-admin/mon-espace-connexion-admin.component').then(m => m.MonEspaceConnexionAdminComponent) },
  { path: '', redirectTo: '/accueil', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
