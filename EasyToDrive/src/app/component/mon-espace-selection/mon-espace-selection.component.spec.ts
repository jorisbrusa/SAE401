import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonEspaceSelectionComponent } from './mon-espace-selection.component';

describe('MonEspaceSelectionComponent', () => {
  let component: MonEspaceSelectionComponent;
  let fixture: ComponentFixture<MonEspaceSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonEspaceSelectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonEspaceSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
