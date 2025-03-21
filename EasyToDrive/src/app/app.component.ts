import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, query, group } from '@angular/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        query(':enter, :leave', [
          style({
            position: 'absolute',
            width: '100%',
            opacity: 0,
            transform: 'translateY(20px)'
          })
        ], { optional: true }),
        group([
          query(':enter', [
            animate('600ms ease', style({ opacity: 1, transform: 'translateY(0)' }))
          ], { optional: true }),
          query(':leave', [
            animate('600ms ease', style({ opacity: 0, transform: 'translateY(-20px)' }))
          ], { optional: true })
        ])
      ])
    ])
  ]
})
export class AppComponent implements AfterViewInit {
  title = 'EasyToDrive';

  @ViewChild(RouterOutlet) outlet!: RouterOutlet; // ✅ Correction

  ngAfterViewInit() {
    console.log("Router Outlet chargé :", this.outlet);
  }

  prepareRoute() {
    return this.outlet?.activatedRouteData?.['animation'] || null;
  }

  onActivate() {
    window.scroll(0, 0);
  }

  hideHeader: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.hideHeader = this.router.url.includes('/mon-espace-dashboard-admin'); // Remplace "/ta-page" par le chemin exact
    });
  }
}
