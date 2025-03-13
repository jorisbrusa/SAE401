import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-mon-espace-selection',
  standalone: true, // ⚠️ important aussi
  imports: [RouterModule],
  templateUrl: './mon-espace-selection.component.html',
  styleUrls: ['./mon-espace-selection.component.css'] // ✅ Correction
})
export class MonEspaceSelectionComponent { }
