import { Component } from '@angular/core';

@Component({
  selector: 'app-mon-espace-dashboard',
  standalone: true,
  templateUrl: './mon-espace-dashboard.component.html', // ✅ Vérifie que le fichier existe
  styleUrls: ['./mon-espace-dashboard.component.css']
})
export class MonEspaceDashboardComponent {} // ✅ S'assurer que la classe est bien exportée
