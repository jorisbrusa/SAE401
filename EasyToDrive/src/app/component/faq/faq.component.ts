import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface Avis {
  Date: string;
  Contenu: string;
}

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class FaqComponent implements OnInit {
  avisList: Avis[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Avis[]>('https://test888.alwaysdata.net/recuperer_avis.php')
      .subscribe({
        next: (data) => {
          this.avisList = data;
        },
        error: (err) => {
          console.error('Erreur récupération avis', err);
        }
      });
  }
}
