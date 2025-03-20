import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mon-espace-dashboard',
  standalone: true,
  imports: [CommonModule], // ✅ Importation de CommonModule pour `ngFor`
  templateUrl: './mon-espace-dashboard.component.html',
  styleUrls: ['./mon-espace-dashboard.component.css'],
})
export class MonEspaceDashboardComponent implements OnInit {
  notesCode: any[] = [];
  notesSimu: any[] = [];
  eleveID: number = 0;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.eleveID = parseInt(localStorage.getItem('eleveID') || '0', 10);
    if (!this.eleveID) {
      console.error("Aucun ID d'élève trouvé.");
      return;
    }

    // Récupération des notes des examens de code et de simulation
    this.http.get<any>(`https://test888.alwaysdata.net/obtenir_notes.php?Eleve_ID=${this.eleveID}`)
      .subscribe({
        next: (data) => {
          console.log("Données reçues:", data); // ✅ Debug API
          
          // Vérifier si l'API retourne bien un objet contenant les deux tableaux
          if (data && typeof data === 'object') {
            this.notesCode = Array.isArray(data.examen_code) ? data.examen_code : [];
            this.notesSimu = Array.isArray(data.examen_simu) ? data.examen_simu : [];
          } else {
            console.error("Format de réponse invalide :", data);
          }
        },
        error: (err) => console.error('Erreur lors de la récupération des notes', err)
      });
  }

  logout() {
    localStorage.removeItem('eleveID'); // ✅ Supprime bien l'ID
  
    this.router.navigate(['/mon-espace']).then(() => {
      window.location.reload(); // 🔄 Recharge pour appliquer AuthGuard immédiatement
    });
  }
  
  
  
  
}
