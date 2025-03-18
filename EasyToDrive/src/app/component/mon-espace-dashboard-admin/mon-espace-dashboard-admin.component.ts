import { Component } from '@angular/core';

@Component({
  selector: 'app-mon-espace-dashboard-admin',
  templateUrl: './mon-espace-dashboard-admin.component.html',
  styleUrls: ['./mon-espace-dashboard-admin.component.css']
})
export class MonEspaceDashboardAdminComponent {
  isModalOpen: boolean = false;

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  ajouterEleve(): void {
    // Récupération des valeurs des champs via le data-binding
    const nom = (document.getElementById("nom") as HTMLInputElement).value;
    const prenom = (document.getElementById("prenom") as HTMLInputElement).value;
    const neph = (document.getElementById("neph") as HTMLInputElement).value;
    const dateNaissance = (document.getElementById("date_naissance") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;

    console.log(`Nom: ${nom}, Prénom: ${prenom}, NEPH: ${neph}, Date: ${dateNaissance}, Email: ${email}`);

    this.closeModal();
  }
}
