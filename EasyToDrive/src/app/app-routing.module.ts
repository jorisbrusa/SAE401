import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonEspaceSelectionComponent } from './component/mon-espace-selection/mon-espace-selection.component';
import { AccueilComponent } from './component/accueil/accueil.component';
import { FaqComponent } from './component/faq/faq.component';
import { ContactComponent } from './component/contact/contact.component';

const routes: Routes = [
  { path: 'mon-espace', component: MonEspaceSelectionComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'accueil', component: AccueilComponent },
  { path: '', redirectTo: '/accueil', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
