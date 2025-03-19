import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mon-espace-connexion-admin',
  standalone: true,
  imports: [CommonModule, FormsModule], // Importation des modules nécessaires
  templateUrl: './mon-espace-connexion-admin.component.html',
  styleUrls: ['./mon-espace-connexion-admin.component.css']
})
export class MonEspaceConnexionAdminComponent {
  email: string = '';
  MDP: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  loginAdmin() {
    const adminData = { email: this.email, MDP: this.MDP };

    this.http.post<any>('https://test888.alwaysdata.net/connexion_admin.php', adminData).subscribe(
      response => {
        if (response.success) {
          localStorage.setItem('adminID', response.ID_Admin);
          this.router.navigate(['/mon-espace-dashboard-admin']);
        } else {
          this.errorMessage = 'Identifiants incorrects.';
        }
      },
      error => {
        this.errorMessage = 'Erreur de connexion.';
      }
    );
  }
}
