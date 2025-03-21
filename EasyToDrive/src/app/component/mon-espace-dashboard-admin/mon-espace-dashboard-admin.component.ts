import { Component, OnInit, inject } from '@angular/core';
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
  selectedEleve: any | null = null;
  notesCode: any[] = [];
  notesSimu: any[] = [];
  isModalOpen = false; // ✅ Initialise bien la variable
  isEditing = false;
  eleveForm = { nom: '', prenom: '', neph: '', email: '' };

  constructor(private http: HttpClient, private router: Router) {}

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

  ouvrirModal() {
    console.log("📢 Modal ouverte !");
    this.isModalOpen = true;
  }

  fermerModal() {
    console.log("❌ Modal fermée !");
    this.isModalOpen = false; // Fermer le modal
    this.eleveForm = { nom: '', prenom: '', neph: '', email: '' }; // Réinitialiser le formulaire
  }

  validerEleve() {
    console.log("🔹 Envoi du formulaire :", this.eleveForm);
  
    const url = this.isEditing
      ? 'https://test888.alwaysdata.net/modifier_eleve.php'
      : 'https://test888.alwaysdata.net/ajouter_eleve.php';
  
    this.http.post(url, this.eleveForm).subscribe(
      (response) => {
        console.log("✅ Réponse du serveur :", response);
        this.chargerEleves();
        this.fermerModal();
      },
      (error) => {
        console.error("❌ Erreur lors de l'ajout :", error);
      }
    );
  }
  afficherDetails(eleve: any) {
    console.log("🧐 Détails de l'élève:", eleve);
    this.selectedEleve = eleve;
    this.ouvrirModal(); // Ouvre la modale avec les détails
    this.eleveForm = { 
        nom: eleve.Nom, 
        prenom: eleve.Prenom, 
        neph: eleve.NEPH_Email, 
        email: '' // Ajoute un champ email si besoin
    };
    this.isEditing = true; // Mode édition activé
}

  logout() {
    localStorage.removeItem('adminID');
    this.router.navigate(['/mon-espace']).then(() => {
      window.location.reload();
    });
  }
}
