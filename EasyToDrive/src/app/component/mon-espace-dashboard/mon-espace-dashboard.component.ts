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


    // Pour les données
    resultatsCode: { Date: string; Numero_Examen: string; Note: number }[] = [];
    resultatsSimu: { Date: string; Numero_Examen: string; Impression: string }[] = [];

    // Pour les graphiques
    barChartType: any = 'bar';
    barChartLegend = true;

    pieChartType: any = 'pie';
    pieChartLegend = true;


  // Graphique en camembert pour les impressions des examens de simulation
  pieChartData: ChartData<'pie'> = {
    labels: [],
    datasets: [
      { data: [] }
    ],
  };

  pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Répartition des impressions des examens de simulation' },
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
        },
        error: (err) => console.error('Erreur lors de la récupération des notes', err),
      });
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

    // Graphique en camembert pour les impressions des examens de simulation
    const impressions = this.notesSimu
      .map((exam) => exam.Impression) // Accédez à la propriété "Impression"
      .filter((imp) => imp !== undefined && imp !== null); // Filtrez les valeurs undefined/null

    const impressionCounts: { [key: string]: number } = {};
    
    impressions.forEach((imp) => {
      impressionCounts[imp] = (impressionCounts[imp] || 0) + 1;
    });

    console.log('Impression Counts:', impressionCounts); // Vérifiez les données dans la console
    console.log('Labels:', Object.keys(impressionCounts)); // Vérifiez les labels
    console.log('Data:', Object.values(impressionCounts)); // Vérifiez les données

    this.pieChartData = {
      labels: Object.keys(impressionCounts),
      datasets: [{ data: Object.values(impressionCounts) }],
    };
}

  logout() {
    localStorage.removeItem('eleveID');
    this.router.navigate(['/mon-espace']).then(() => {
      window.location.reload();
    });
  }
}
