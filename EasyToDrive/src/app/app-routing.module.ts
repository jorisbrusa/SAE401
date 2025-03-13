import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonEspaceSelectionComponent } from './component/mon-espace-selection/mon-espace-selection.component';
import { AccueilComponent } from './component/accueil/accueil.component';

const routes: Routes = [
  { path: 'mon-espace-selection', component: MonEspaceSelectionComponent },
  { path: 'accueil', component: AccueilComponent },
  { path: '', redirectTo: '/accueil', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }