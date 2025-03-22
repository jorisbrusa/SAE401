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
  notesEleve: any = { examen_code: [], examen_simu: [] };
  currentModal: string | null = null; // Gère l'état des modales
  eleveSelectionne: any = null;
  isCodeVisible = false;

  eleveForm = {
    ID: null,
    Nom: '',
    Prenom: '',
    NEPH_Email: '',
    Auto_Ecole: '',
    Jour_inscription: '',
    code: ''
  };

  nouvelleNote = { date: '', numeroExamen: '', score: '' };
  nouvelleImpression = { date: '', numeroExamen: '', impression: '' };
  noteEnCours: any = null;
  impressionEnCours: any = null;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    console.log("🚀 Initialisation du composant Dashboard Admin");
    this.chargerEleves();
  }

  toggleCodeVisibility() {
    this.isCodeVisible = !this.isCodeVisible;
    console.log(`👁️ Code visibility toggled: ${this.isCodeVisible}`);
  }

  chargerEleves() {
    console.log("🔍 Chargement des élèves...");
    this.http.get<any[]>('https://test888.alwaysdata.net/obtenir_eleves.php').subscribe(
      (data: any[]) => {
        console.log("✅ Élèves chargés avec succès:", data);
        this.eleves = data;
      },
      (error: any) => console.error("❌ Erreur lors du chargement des élèves:", error)
    );
  }

  ouvrirModal(modalType: string) {
    console.log(`🚪 Ouverture de la modale: ${modalType}`);
    this.currentModal = modalType;
  }

  fermerModal() {
    console.log("🚪 Fermeture de la modale");
    this.currentModal = null;
    this.eleveForm = { ID: null, Nom: '', Prenom: '', NEPH_Email: '', Auto_Ecole: '', Jour_inscription: '', code: '' };
    this.nouvelleNote = { date: '', numeroExamen: '', score: '' };
    this.nouvelleImpression = { date: '', numeroExamen: '', impression: '' };
    this.noteEnCours = null;
    this.impressionEnCours = null;
  }

  validerEleve() {
    console.log("✅ Validation d'un nouvel élève:", this.eleveForm);
    const url = 'https://test888.alwaysdata.net/ajouter_eleve.php';
    this.http.post(url, this.eleveForm).subscribe(
      (response: any) => {
        console.log("✅ Élève ajouté avec succès:", response);
        this.chargerEleves();
        this.fermerModal();
      },
      (error: any) => console.error("❌ Erreur lors de l'ajout :", error)
    );
  }

  afficherDetails(eleve: any) {
    console.log("🔍 Affichage des détails de l'élève:", eleve);
    this.eleveSelectionne = eleve;
    this.currentModal = 'details';

    this.http.get<any>(`https://test888.alwaysdata.net/obtenir_notes_admin.php?Eleve_ID=${eleve.ID}`).subscribe(
      (data: any) => {
        console.log("✅ Notes de l'élève chargées avec succès:", data);
        this.notesEleve = data;
      },
      (error: any) => console.error("❌ Erreur lors de la récupération des notes:", error)
    );
  }

  modifierEleve(eleve: any) {
    console.log("✏️ Modification de l'élève:", eleve);
    this.eleveForm = { ...eleve };
    this.currentModal = 'edit';
  }

  validerModification() {
    console.log("✅ Validation de la modification de l'élève:", this.eleveForm);
    this.http.post('https://test888.alwaysdata.net/modifier_eleve.php', this.eleveForm).subscribe(
      (response: any) => {
        console.log("✅ Élève modifié avec succès:", response);
        this.chargerEleves();
        this.fermerModal();
      },
      (error: any) => console.error("❌ Erreur lors de la modification :", error)
    );
  }

  supprimerEleve(eleve: any) {
    console.log("🗑️ Suppression de l'élève:", eleve);
    if (confirm("Êtes-vous sûr de vouloir supprimer cet élève ?")) {
      this.http.post('https://test888.alwaysdata.net/supprimer_eleve.php', { id: eleve.ID }).subscribe(
        (response: any) => {
          console.log("✅ Élève supprimé avec succès:", response);
          this.chargerEleves();
        },
        (error: any) => console.error("❌ Erreur lors de la suppression :", error)
      );
    }
  }

  ajouterNote() {
    console.log("➕ Ajout d'une nouvelle note");
    this.nouvelleNote = { date: '', numeroExamen: '', score: '' };
    this.currentModal = 'addNote';
  }

  validerAjoutNote() {
    console.log("✅ Validation de l'ajout de la note:", this.nouvelleNote);
    const url = 'https://test888.alwaysdata.net/ajouter_note.php'; // Remplacez par l'URL de votre API
    this.http.post(url, {
        Eleve_ID: this.eleveSelectionne.ID,
        Date: this.nouvelleNote.date,
        Numero_Examen: this.nouvelleNote.numeroExamen,
        Note: this.nouvelleNote.score
    }).subscribe(
        (response: any) => {
            console.log("✅ Note ajoutée avec succès:", response);
            this.fermerModal();
            this.afficherDetails(this.eleveSelectionne); // Recharger les détails de l'élève
        },
        (error: any) => console.error("❌ Erreur lors de l'ajout de la note:", error)
    );
  }

  modifierNote(note: any) {
    console.log("✏️ Modification de la note:", note);
    this.noteEnCours = { ...note };
    this.nouvelleNote = { date: note.Date, numeroExamen: note.Numero_Examen, score: note.Note };
    this.currentModal = 'editNote';
  }

  validerModificationNote() {
    console.log("✅ Validation de la modification de la note:", this.nouvelleNote);
    const url = 'https://test888.alwaysdata.net/modifier_note.php'; // Remplacez par l'URL de votre API
    this.http.post(url, {
        id: this.noteEnCours.id,
        Date: this.nouvelleNote.date,
        Numero_Examen: this.nouvelleNote.numeroExamen,
        Note: this.nouvelleNote.score
    }).subscribe(
        (response: any) => {
            console.log("✅ Note modifiée avec succès:", response);
            this.fermerModal();
            this.afficherDetails(this.eleveSelectionne); // Recharger les détails de l'élève
        },
        (error: any) => console.error("❌ Erreur lors de la modification de la note:", error)
    );
  }

  supprimerNote(id: number) {
    console.log("🗑️ Suppression de la note avec l'ID:", id);
    if (confirm("Voulez-vous vraiment supprimer cette note ?")) {
      this.notesEleve.examen_code = this.notesEleve.examen_code.filter((n: any) => n.id !== id);
      console.log("✅ Note supprimée avec succès");
    }
  }

  ajouterImpression() {
    console.log("➕ Ajout d'une nouvelle impression");
    this.nouvelleImpression = { date: '', numeroExamen: '', impression: '' };
    this.currentModal = 'addImpression';
  }

  validerAjoutImpression() {
    console.log("✅ Validation de l'ajout de l'impression:", this.nouvelleImpression);
    const url = 'https://test888.alwaysdata.net/ajouter_note.php'; // Remplacez par l'URL de votre API
    this.http.post(url, {
        Eleve_ID: this.eleveSelectionne.ID,
        Date: this.nouvelleImpression.date,
        Numero_Examen: this.nouvelleImpression.numeroExamen,       
         Impression: this.nouvelleImpression.impression
      }).subscribe(
          (response: any) => {
              console.log("✅ Impression ajoutée avec succès:", response);
              this.fermerModal();
              this.afficherDetails(this.eleveSelectionne); // Recharger les détails de l'élève
          },
          (error: any) => console.error("❌ Erreur lors de l'ajout de l'impression:", error)
      );
  }
  
  modifierImpression(impression: any) {
      console.log("✏️ Modification de l'impression:", impression);
      this.impressionEnCours = { ...impression };
      this.nouvelleImpression = { date: impression.Date, numeroExamen: impression.Numero_Examen, impression: impression.Impression };
      this.currentModal = 'editImpression';
  }
  
  validerModificationImpression() {
      console.log("✅ Validation de la modification de l'impression:", this.nouvelleImpression);
      const url = 'https://test888.alwaysdata.net/modifier_impression.php'; // Remplacez par l'URL de votre API
      this.http.post(url, {
          id: this.impressionEnCours.id,
          Date: this.nouvelleImpression.date,
          Numero_Examen: this.nouvelleImpression.numeroExamen,
          Impression: this.nouvelleImpression.impression
      }).subscribe(
          (response: any) => {
              console.log("✅ Impression modifiée avec succès:", response);
              this.fermerModal();
              this.afficherDetails(this.eleveSelectionne); // Recharger les détails de l'élève
          },
          (error: any) => console.error("❌ Erreur lors de la modification de l'impression:", error)
      );
  }
  
  supprimerImpression(id: number) {
      console.log("🗑️ Suppression de l'impression avec l'ID:", id);
      if (confirm("Voulez-vous vraiment supprimer cette impression ?")) {
        this.notesEleve.examen_simu = this.notesEleve.examen_simu.filter((i: any) => i.id !== id);
        console.log("✅ Impression supprimée avec succès");
      }
  }
  
  logout() {
      console.log("🚪 Déconnexion de l'administrateur");
      localStorage.removeItem('adminID');
      this.router.navigate(['/mon-espace']).then(() => window.location.reload());
  }
}