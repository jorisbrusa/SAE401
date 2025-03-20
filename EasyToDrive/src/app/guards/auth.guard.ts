import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private router: Router) {}

  canActivate(): boolean {
    const eleveID = localStorage.getItem('eleveID');
    const adminID = localStorage.getItem('adminID');
    
    if (eleveID || adminID) {
      return true; // L'utilisateur est authentifié
    } else {
      this.router.navigate(['/mon-espace']); // Redirection vers la connexion
      return false;
    }
  }
}