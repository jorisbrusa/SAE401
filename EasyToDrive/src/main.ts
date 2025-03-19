import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http'; // ✅ Importer provideHttpClient

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient() // ✅ Ajout de HttpClient pour éviter l’erreur "No provider for HttpClient"
  ]
}).catch(err => console.error(err));
