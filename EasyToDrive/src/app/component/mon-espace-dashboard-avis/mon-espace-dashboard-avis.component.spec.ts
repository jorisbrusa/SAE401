import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonEspaceDashboardAvisComponent } from './mon-espace-dashboard-avis.component';

describe('MonEspaceDashboardAvisComponent', () => {
  let component: MonEspaceDashboardAvisComponent;
  let fixture: ComponentFixture<MonEspaceDashboardAvisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonEspaceDashboardAvisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonEspaceDashboardAvisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
