import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private router = inject(Router);

  canActivate(): boolean {
    const adminId = localStorage.getItem('adminID'); 
    const eleveId = localStorage.getItem('eleveID');

    if (adminId || eleveId) {
      return true;
    } else {
      console.warn("Accès refusé - Redirection vers /mon-espace");
      this.router.navigate(['/mon-espace']);
      return false;
    }
  }
}
