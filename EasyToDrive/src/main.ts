import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), // ✅ Pour activer le routage Angular
    provideAnimations() // ✅ Pour activer les animations Angular
  ]
}).catch(err => console.error(err));
