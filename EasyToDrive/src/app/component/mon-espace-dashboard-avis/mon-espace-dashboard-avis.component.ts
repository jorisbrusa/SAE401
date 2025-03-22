import { Component } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-mon-espace-dashboard-avis',
  standalone: true,
  templateUrl: './mon-espace-dashboard-avis.component.html',
  styleUrls: ['./mon-espace-dashboard-avis.component.css'],
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule]
})

export class MonEspaceDashboardAvisComponent {
  avis = {
    Eleve_ID: 0,
    Contenu: '',
    Date: new Date().toISOString().split('T')[0]
  };

  constructor(private http: HttpClient, private router: Router) {}

  envoyerAvis() {
    this.avis.Eleve_ID = Number(localStorage.getItem('eleveID') || 0);
    console.log('Envoi de :', this.avis); // 💡 LOG ICI
  
    this.http.post('https://test888.alwaysdata.net/ajouter_avis.php', this.avis)
      .subscribe({
        next: () => {
          alert("Merci pour votre avis !");
          this.avis.Contenu = '';
        },
        error: (err) => {
          console.error(err);
          alert("Erreur lors de l'envoi de l'avis.");
        }
      });
  }
  

  logout() {
    localStorage.removeItem('eleveID');
    this.router.navigate(['/mon-espace']).then(() => window.location.reload());
  }
}
