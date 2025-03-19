import { Component, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mon-espace-dashboard-admin',
  imports :[CommonModule],
  templateUrl: './mon-espace-dashboard-admin.component.html',
  styleUrls: ['./mon-espace-dashboard-admin.component.css']
})
export class MonEspaceDashboardAdminComponent implements OnInit {
  eleves: any[] = [];  // Stocke la liste des élèves
  selectedEleve: any | null = null;  // Élève sélectionné
  notesCode: any[] = []; // Notes des examens de code
  notesSimu: any[] = []; // Résultats des examens de simulation

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.chargerEleves();
  }

  // Fonction pour récupérer la liste des élèves
  chargerEleves() {
    this.http.get<any[]>('https://test888.alwaysdata.net/obtenir_eleves.php')
      .subscribe(
        (data) => {
          this.eleves = data;
        },
        (error) => {
          console.error('Erreur lors du chargement des élèves:', error);
        }
      );
  }

  // Fonction pour afficher les détails d'un élève sélectionné
  afficherDetails(eleve: any) {
    this.selectedEleve = eleve;

    // Récupérer les notes de cet élève
    this.http.get<any>('https://test888.alwaysdata.net/obtenir_notes_admin.php')
      .subscribe(
        (data) => {
          this.notesCode = data.examen_code.filter((note: any) => note.Eleve_ID === eleve.ID);
          this.notesSimu = data.examen_simu.filter((simu: any) => simu.Eleve_ID === eleve.ID);
        },
        (error) => {
          console.error('Erreur lors du chargement des notes:', error);
        }
      );
  }

  // Fonction pour déconnecter l'admin
  logout() {
    localStorage.removeItem('admin_id');
    this.router.navigate(['/mon-espace-connexion-admin']);
  }
}
