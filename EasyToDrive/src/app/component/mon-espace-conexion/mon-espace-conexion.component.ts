import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mon-espace-conexion',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './mon-espace-conexion.component.html',
  styleUrls: ['./mon-espace-conexion.component.css']
})
export class MonEspaceConexionComponent {
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    const body = {
      NEPH_Email: this.email,
      code: this.password // Assure-toi d'envoyer le bon champ
    };

    this.http.post<any>('https://test888.alwaysdata.net/connexion.php', body)
      .subscribe((response: any) => {
        if (response.success) {
          // ✅ Stocker l'ID de l'élève connecté
          localStorage.setItem('eleveID', response.ID);

          // ✅ Rediriger vers le tableau de bord
          this.router.navigate(['/mon-espace-dashboard']);
        } else {
          alert(response.error || 'Erreur de connexion');
        }
      }, (error) => {
        alert('Une erreur est survenue lors de la connexion.');
      });
  }
}
