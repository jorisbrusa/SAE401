import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  menuOuvert = false;

  toggleMenu() {
    this.menuOuvert = !this.menuOuvert;
  }

  fermerMenu() {
    this.menuOuvert = false;
  }
}
