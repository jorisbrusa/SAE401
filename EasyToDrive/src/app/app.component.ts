import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { routes } from './app.routes';
import { MonEspaceConexionComponent } from './component/mon-espace-conexion/mon-espace-conexion.component';
import { MonEspaceDashboardComponent } from './component/mon-espace-dashboard/mon-espace-dashboard.component';
import { AccueilComponent } from './component/accueil/accueil.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, MonEspaceConexionComponent, MonEspaceDashboardComponent,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'EasyToDrive';
}
