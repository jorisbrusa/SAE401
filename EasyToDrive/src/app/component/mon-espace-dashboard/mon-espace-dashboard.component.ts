import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-mon-espace-dashboard',
  standalone: true,
  imports: [CommonModule, NgChartsModule, RouterModule],
  templateUrl: './mon-espace-dashboard.component.html',
  styleUrls: ['./mon-espace-dashboard.component.css'],
})
export class MonEspaceDashboardComponent implements OnInit {
  notesCode: any[] = [];
  notesSimu: any[] = [];
  eleveID: number = 0;
  moyenneCode: string = '0';
  moyenneChartData: ChartData<'pie'> = {
    labels: ['Moyenne', 'Écart max (sur 40)'],
    datasets: [{
      data: [0, 40],
      backgroundColor: ['#2b6cb0', '#ddd'],
      hoverOffset: 4
    }]
  };
  moyenneChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.label} : ${context.parsed}`
        }
      }
    }
  };

  // Graphique en barres pour les examens de code
  barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      { data: [], label: 'Examens de code' }
    ],
  };

  barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Notes des examens de code' },
    },
  };

  // Graphique en barres pour les impressions des examens de simulation
  impressionBarChartData: ChartData<'bar'> = {
    labels: [], // Les impressions seront les labels
    datasets: [
      { data: [], label: 'Nombre d\'impressions' }
    ],
  };

  impressionBarChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Répartition des impressions des examens de simulation' },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1, // Pour afficher des nombres entiers
        },
      },
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
          console.log('Données reçues:', data);
          this.notesCode = Array.isArray(data.examen_code) ? data.examen_code : [];
          this.notesSimu = Array.isArray(data.examen_simu) ? data.examen_simu : [];
          this.updateChartData();
          this.moyenneCode = this.calculerMoyenneCode();
          this.updateMoyenneChartData();
        },
        error: (err) => console.error('Erreur lors de la récupération des notes', err),
      });
  }

  calculerMoyenneCode(): string {
    if (!this.notesCode || this.notesCode.length === 0) return '0';
    const total = this.notesCode.reduce((acc, note) => acc + Number(note.Note), 0);
    return (total / this.notesCode.length).toFixed(2);
  }

  updateMoyenneChartData() {
    this.moyenneChartData = {
      labels: ['Moyenne', 'Écart max (sur 40)'],
      datasets: [{
        data: [parseFloat(this.moyenneCode), 40 - parseFloat(this.moyenneCode)],
        backgroundColor: ['#2b6cb0', '#ddd'],
        hoverOffset: 4
      }]
    };
  }

  updateChartData() {
    // Graphique en barres pour les notes de code
    const labelsCode = this.notesCode.map((note, i) => `Examen ${i + 1}`);
    const dataCode = this.notesCode.map((note) => parseFloat(note.Note));

    this.barChartData = {
      labels: labelsCode,
      datasets: [
        { data: dataCode, label: 'Code' }
      ],
    };

    // Graphique en barres pour les impressions des examens de simulation
    const impressions = this.notesSimu
      .map((exam) => exam.Impression)
      .filter((imp) => imp !== undefined && imp !== null);

    const impressionCounts: { [key: string]: number } = {};
    
    impressions.forEach((imp) => {
      impressionCounts[imp] = (impressionCounts[imp] || 0) + 1;
    });

    this.impressionBarChartData = {
      labels: Object.keys(impressionCounts), // Les impressions (Examen réussi avec aisance, Bon, etc.)
      datasets: [
        {
          data: Object.values(impressionCounts),
          label: 'Impression',
          backgroundColor: [
            '#2b6cb0', // Couleur pour "Examen réussi avec aisance"
            '#4caf50', // Couleur pour "Bon"
            '#ffc107', // Couleur pour "Moyen"
            '#f44336', // Couleur pour "Excellent"
            '#9c27b0', // Couleur pour "Passable"
            '#ff9800', // Couleur pour "Très bon"
            '#607d8b', // Couleur pour "Médiocre"
          ],
        }
      ],
    };
  }

  logout() {
    localStorage.removeItem('eleveID');
    this.router.navigate(['/mon-espace']).then(() => {
      window.location.reload();
    });
  }
}