import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonEspaceDashboardComponent } from './mon-espace-dashboard.component';

describe('MonEspaceDashboardComponent', () => {
  let component: MonEspaceDashboardComponent;
  let fixture: ComponentFixture<MonEspaceDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonEspaceDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonEspaceDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
