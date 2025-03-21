import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mon-espace-dashboard-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mon-espace-dashboard-admin.component.html',
  styleUrls: ['./mon-espace-dashboard-admin.component.css']
})
export class MonEspaceDashboardAdminComponent implements OnInit {
  eleves: any[] = [];
  selectedEleve: any | null = null; // Élève sélectionné pour afficher les détails
  notesEleve: any = { examen_code: [], examen_simu: [] }; // Stocker les notes de l'élève
  isModalOpen = false; // Modal pour ajouter/modifier un élève
  isDetailsModalOpen = false; // Modal pour afficher les détails
  isEditing = false;
  eleveSelectionne: any = null;

  // Formulaire pour ajouter/modifier un élève
  eleveForm = { 
    ID: null, // Add the ID property
    Nom: '', 
    Prenom: '', 
    NEPH_Email: '', 
    Auto_Ecole: '', 
    Jour_inscription: '', 
    code: '' 
  };

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.chargerEleves();
  }

  isCodeVisible = false; // le mot de passe est caché

  toggleCodeVisibility() {
    this.isCodeVisible = !this.isCodeVisible;
  }

  chargerEleves() {
    this.http.get<any[]>('https://test888.alwaysdata.net/obtenir_eleves.php').subscribe(
      (data: any[]) => {
        this.eleves = data;
      },
      (error: any) => {
        console.error('Erreur lors du chargement des élèves:', error);
      }
    );
  }

  ouvrirModal() {
    console.log("📢 Modal ouverte !");
    this.isModalOpen = true;
  }

  fermerModal() {
    console.log("❌ Modal fermée !");
    this.isModalOpen = false;
    this.isDetailsModalOpen = false; // Fermer aussi la modal des détails
    // Réinitialisation des champs du formulaire
    this.eleveForm = { ID: null, Nom: '', Prenom: '', NEPH_Email: '', Auto_Ecole: '', Jour_inscription: '', code: '' };
    this.isEditing = false;
  }
  
  validerEleve() {
    console.log("🔹 Envoi du formulaire :", this.eleveForm);

    const url = this.isEditing
      ? 'https://test888.alwaysdata.net/modifier_eleve.php'
      : 'https://test888.alwaysdata.net/ajouter_eleve.php';

    this.http.post(url, this.eleveForm).subscribe(
      (response: any) => {
        console.log("✅ Réponse du serveur :", response);
        this.chargerEleves();
        this.fermerModal();
      },
      (error: any) => {
        console.error("❌ Erreur lors de l'ajout :", error);
      }
    );
  }

  afficherDetails(eleve: any, event: MouseEvent) {
    event.stopPropagation();
    console.log("🧐 Détails de l'élève:", eleve);
    this.eleveSelectionne = eleve;
    this.isDetailsModalOpen = true; // Ouvrir la modal des détails

    // Vérifiez l'URL de l'API
    const url = `https://test888.alwaysdata.net/obtenir_notes_admin.php?Eleve_ID=${eleve.ID}`;
    console.log("🔗 URL de l'API:", url);

    // Récupérer les notes de l'élève
    this.http.get<any>(url).subscribe(
      (data: any) => {
        console.log("📊 Réponse de l'API:", data);
        this.notesEleve = {
          examen_code: data.examen_code || [], // Assurez-vous que examen_code est un tableau
          examen_simu: data.examen_simu || [] // Assurez-vous que examen_simu est un tableau
        };
      },
      (error: any) => {
        console.error("❌ Erreur lors de la récupération des notes:", error);
        this.notesEleve = { examen_code: [], examen_simu: [] }; // Réinitialiser en cas d'erreur
      }
    );
  }

  modifierEleve(eleve: any) {
    console.log("🖊️ Modification de l'élève:", eleve);

    // Pré-remplir le formulaire avec les valeurs de l'élève
    this.eleveForm = {
        ID: eleve.ID, // Inclure l'ID pour la modification
        Nom: eleve.Nom,
        Prenom: eleve.Prenom,
        NEPH_Email: eleve.NEPH_Email,
        Auto_Ecole: eleve.Auto_Ecole,
        Jour_inscription: eleve.Jour_inscription,
        code: eleve.code
    };

    // Passer en mode édition
    this.isEditing = true;

    // Ouvrir la modal
    this.ouvrirModal();
}

  supprimerEleve(eleve: any) {
    console.log("Suppression de l'élève:", eleve);
    if (confirm("Êtes-vous sûr de vouloir supprimer cet élève ?")) {
<<<<<<< HEAD
        const url = 'https://test888.alwaysdata.net/supprimer_eleve.php';
        const options = {
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: eleve.ID })
        };

        this.http.delete(url, options).subscribe(
=======
        const url = `https://test888.alwaysdata.net/supprimer_eleve.php?ID=${eleve.ID}`;
        this.http.delete(url).subscribe(
>>>>>>> cd78e221204f0fa026b64491093fd25fc845f6df
            (response: any) => {
                console.log("Réponse du serveur :", response);
                this.chargerEleves();
            },
            (error: any) => {
                console.error("Erreur lors de la suppression :", error);
            }
        );
    }
  }


  logout() {
    localStorage.removeItem('adminID');
    this.router.navigate(['/mon-espace']).then(() => {
      window.location.reload();
    });
  }
}