import { Component } from '@angular/core';

@Component({
  selector: 'app-mon-espace-dashboard-admin',
  templateUrl: './mon-espace-dashboard-admin.component.html',
  styleUrls: ['./mon-espace-dashboard-admin.component.css']
})
export class monespacedashboardadmincomponent{
  isModalOpen: boolean = false;

  // 🔹 Déclaration des variables pour le formulaire (utilisées avec ngModel)
  nom: string = "";
  prenom: string = "";
  neph: string = "";
  dateNaissance: string = "";
  email: string = "";
  password: string = "";

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  ajouterEleve(): void {
    console.log(`Nom: ${this.nom}, Prénom: ${this.prenom}, NEPH: ${this.neph}, Date: ${this.dateNaissance}, Email: ${this.email}`);
    this.closeModal();
  }
}
