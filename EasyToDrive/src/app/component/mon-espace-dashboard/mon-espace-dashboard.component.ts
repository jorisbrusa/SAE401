import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-mon-espace-dashboard',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, NgChartsModule],
  templateUrl: './mon-espace-dashboard.component.html',
  styleUrls: ['./mon-espace-dashboard.component.css'],
})
export class MonEspaceDashboardComponent implements OnInit {
  notesCode: any[] = [];
  notesSimu: any[] = [];
  eleveID: number = 0;

  barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: []
  };

  barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Notes des examens (Code & Simulation)' },
    },
  };

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.eleveID = parseInt(localStorage.getItem('eleveID') || '0', 10);
    if (!this.eleveID) {
      console.error("Aucun ID d'élève trouvé.");
      return;
    }

    this.http
      .get<any>(`https://test888.alwaysdata.net/obtenir_notes.php?Eleve_ID=${this.eleveID}`)
      .subscribe({
        next: (data) => {
          this.notesCode = Array.isArray(data.examen_code) ? data.examen_code : [];
          this.notesSimu = Array.isArray(data.examen_simu) ? data.examen_simu : [];
          this.updateChartData();
        },
        error: (err) => console.error('Erreur lors de la récupération des notes', err),
      });
  }

  updateChartData() {
    const maxExamens = Math.max(this.notesCode.length, this.notesSimu.length);
    const labels = Array.from({ length: maxExamens }, (_, i) => `Examen ${i + 1}`);

    const codeNotes = this.notesCode.map(n => parseFloat(n.Note));
    const simuNotes = this.notesSimu.map(n => parseFloat(n.Impression));

    this.barChartData = {
      labels,
      datasets: [
        {
          data: codeNotes,
          label: 'Code',
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
        },
        {
          data: simuNotes,
          label: 'Simulation',
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
        }
      ]
    };
  }

  logout() {
    localStorage.removeItem('eleveID');
    this.router.navigate(['/mon-espace']).then(() => window.location.reload());
  }
}
