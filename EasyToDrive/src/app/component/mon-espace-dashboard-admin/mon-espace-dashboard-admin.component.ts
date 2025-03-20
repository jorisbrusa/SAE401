import { Component, OnInit, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';

@Component({
  selector: 'app-mon-espace-dashboard-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [],
  templateUrl: './mon-espace-dashboard-admin.component.html',
  styleUrls: ['./mon-espace-dashboard-admin.component.css']
})
export class MonEspaceDashboardAdminComponent implements OnInit {
  eleves: any[] = [];
  selectedEleve: any | null = null;
  notesCode: any[] = [];
  notesSimu: any[] = [];
  isModalOpen = false;
  isEditing = false;
  eleveForm = { nom: '', prenom: '', neph: '', email: '' };

  private router = inject(Router);

  constructor(private http: HttpClient) {}

  ouvrirModal() {
    this.isModalOpen = true;
  }

  fermerModal() {
    this.isModalOpen = false;
  }

  ngOnInit() {
    this.chargerEleves();
  }

  chargerEleves() {
    this.http.get<any[]>('https://test888.alwaysdata.net/obtenir_eleves.php').subscribe(
      (data) => {
        this.eleves = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des élèves:', error);
      }
    );
  }

  afficherDetails(eleve: any) {
    this.selectedEleve = eleve;

    // Vérifie si l'élève sélectionné a un ID valide
    if (!eleve.ID) {
        console.error("Erreur: L'élève sélectionné n'a pas d'ID.");
        return;
    }

    // Ajout de l'ID de l'élève en tant que paramètre dans l'URL
    const url = `https://test888.alwaysdata.net/obtenir_notes_admin.php?Eleve_ID=${eleve.ID}`;

    this.http.get<any>(url).subscribe(
        (data) => {
            console.log("Réponse API pour les notes:", data);

            // Vérification et assignation des notes si elles existent
            this.notesCode = data.examen_code ? data.examen_code : [];
            this.notesSimu = data.examen_simu ? data.examen_simu : [];
        },
        (error) => {
            console.error("Erreur lors du chargement des notes:", error);
        }
    );
  }

  validerEleve() {
    const url = this.isEditing ? 'https://test888.alwaysdata.net/modifier_eleve.php' : 'https://test888.alwaysdata.net/ajouter_eleve.php';
    this.http.post(url, this.eleveForm).subscribe(
      () => {
        this.chargerEleves();
        this.fermerModal();
      },
      (error) => {
        console.error('Erreur lors de la sauvegarde:', error);
      }
    );
  }

  logout() {
    localStorage.removeItem('adminID'); // ✅ Supprime bien l'ID
  
    this.router.navigate(['/mon-espace']).then(() => {
      window.location.reload(); // 🔄 Recharge pour appliquer AuthGuard immédiatement
    });
  }
  
  
  
  
}
