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
  avisList: any[] = [];

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
    this.chargerAvis();

  }

  chargerAvis() {
    this.http.get<any[]>('https://test888.alwaysdata.net/obtenir_avis.php').subscribe(
      (data) => {
        this.avisList = data;
        console.log("📝 Avis chargés :", data);
      },
      (error) => {
        console.error("❌ Erreur chargement avis :", error);
      }
    );
  }
  
  supprimerAvis(id: number) {
    if (confirm("Supprimer cet avis ?")) {
      this.http.delete(`https://test888.alwaysdata.net/supprimer_avis.php?ID=${id}`).subscribe(
        (res: any) => {
          if (res.success) {
            this.avisList = this.avisList.filter(a => a.ID_AVIS !== id);
          } else {
            alert("Erreur lors de la suppression");
          }
        },
        (err) => console.error("❌ Erreur suppression :", err)
      );
    }
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
    const id = eleve;
  
    if (!id) {
      alert("Erreur : ID de l'élève introuvable.");
      return;
    }
  
    const url = `https://test888.alwaysdata.net/supprimer_eleve.php?ID=${id}`;
    console.log("🔗 URL appelée :", url);
  
    if (confirm("Êtes-vous sûr de vouloir supprimer cet élève ?")) {
      this.http.delete(url).subscribe(
        (response: any) => {
          console.log("✅ Réponse du serveur :", response);
  
          if (response?.success) {
            alert("✅ L'élève a bien été supprimé.");
          } else {
            alert("❌ Erreur lors de la suppression : " + (response?.error || "Réponse inconnue"));
          }
  
          this.chargerEleves();
        },
        (error: any) => {
          console.error("❌ Erreur HTTP :", error);
          alert("Erreur lors de la suppression de l'élève.");
        }
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
  
    // Assigne manuellement les propriétés pour garantir l'ID
    this.noteEnCours = {
      ID: note.ID ?? note.id, // Prend ID ou id peu importe le nom de départ
      Date: note.Date,
      Numero_Examen: note.Numero_Examen,
      Note: note.Note
    };
  
    this.nouvelleNote = {
      date: note.Date,
      numeroExamen: note.Numero_Examen,
      score: note.Note
    };
  
    this.currentModal = 'editNote';
  }
  
  validerModificationNote() {
    console.log("✅ Validation de la modification de la note:", this.nouvelleNote);
    console.log("🧩 ID envoyé:", this.noteEnCours.ID);
  
    if (!this.noteEnCours.ID) {
      console.error("❌ L'ID de la note est manquant !");
      return;
    }
  
    const url = 'https://test888.alwaysdata.net/modifier_note.php';
  
    this.http.post(url, {
      ID: this.noteEnCours.ID, // majuscule ici aussi
      Date: this.nouvelleNote.date,
      Numero_Examen: this.nouvelleNote.numeroExamen,
      Note: this.nouvelleNote.score
    }).subscribe(
      (response: any) => {
        console.log("✅ Note modifiée avec succès:", response);
        this.fermerModal();
        this.afficherDetails(this.eleveSelectionne);
      },
      (error: any) => console.error("❌ Erreur lors de la modification de la note:", error)
    );
  }
  
  
  

  supprimerNote(id: number) {
    if (confirm("Voulez-vous vraiment supprimer cette note ?")) {
      console.log("🗑️ Suppression de la note avec l'ID:", id);
  
      const url = 'https://test888.alwaysdata.net/supprimer_note.php';
      this.http.post(url, { id }).subscribe(
        (res: any) => {
          console.log("✅ Note supprimée avec succès:", res);
  
          // Rechargement complet depuis l'API
          this.afficherDetails(this.eleveSelectionne);
        },
        (err: any) => console.error("❌ Erreur lors de la suppression:", err)
      );
    }
  }
  
  

  ajouterImpression() {
    console.log("➕ Ajout d'une nouvelle impression");
    this.nouvelleImpression = { date: '', numeroExamen: '', impression: '' };
    this.currentModal = 'addImpression';
  }

  validerAjoutImpression() {
    console.log("✅ Validation de l'ajout de l'impression:", this.nouvelleImpression);
    const url = 'https://test888.alwaysdata.net/ajouter_note.php';
    this.http.post(url, {
        Eleve_ID: this.eleveSelectionne.ID,
        Date: this.nouvelleImpression.date,
        Numero_Examen: this.nouvelleImpression.numeroExamen,       
         Impression: this.nouvelleImpression.impression
      }).subscribe(
          (response: any) => {
              console.log("✅ Impression ajoutée avec succès:", response);
              this.fermerModal();
              this.afficherDetails(this.eleveSelectionne); 
          },
          (error: any) => console.error("❌ Erreur lors de l'ajout de l'impression:", error)
      );
  }
  
  modifierImpression(impression: any) {
    console.log("✏️ Modification de l'impression:", impression);
  
    // Si ID non présent, tente de récupérer depuis un autre champ
    if (!impression.ID && impression.id) {
      impression.ID = impression.id;
    }
  
    this.impressionEnCours = { ...impression };
  
    this.nouvelleImpression = {
      date: impression.Date,
      numeroExamen: impression.Numero_Examen,
      impression: impression.Impression
    };
  
    this.currentModal = 'editImpression';
  }
  
  
  validerModificationImpression() {
    console.log("✅ Validation de la modification de l'impression:", this.nouvelleImpression);
    console.log("🧩 ID impression envoyé:", this.impressionEnCours.ID);
  
    if (!this.impressionEnCours.ID) {
      console.error("❌ L'ID de l'impression est manquant !");
      return;
    }
  
    const url = 'https://test888.alwaysdata.net/modifier_simu.php';
  
    this.http.post(url, {
      id: this.impressionEnCours.ID,
      Date: this.nouvelleImpression.date,
      Numero_Examen: this.nouvelleImpression.numeroExamen,
      Impression: this.nouvelleImpression.impression
    }).subscribe(
      (response: any) => {
        console.log("✅ Impression modifiée avec succès:", response);
        this.fermerModal();
        this.afficherDetails(this.eleveSelectionne);
      },
      (error: any) => console.error("❌ Erreur lors de la modification de l'impression:", error)
    );
  }
  
  
  supprimerImpression(id: number) {
    if (confirm("Voulez-vous vraiment supprimer cette impression ?")) {
      console.log("🗑️ Suppression de l'impression avec l'ID:", id);
  
      const url = 'https://test888.alwaysdata.net/supprimer_simu.php';
      this.http.post(url, { id }).subscribe(
        (res: any) => {
          console.log("✅ Impression supprimée avec succès:", res);
  
          // Mettre à jour les données affichées
          this.afficherDetails(this.eleveSelectionne);
        },
        (err: any) => console.error("❌ Erreur lors de la suppression de l'impression:", err)
      );
    }
  }
  
  
  
  logout() {
      console.log("🚪 Déconnexion de l'administrateur");
      localStorage.removeItem('adminID');
      this.router.navigate(['/mon-espace']).then(() => window.location.reload());
  }
}