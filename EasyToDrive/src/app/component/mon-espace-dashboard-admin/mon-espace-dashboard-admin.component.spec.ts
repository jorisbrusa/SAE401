import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonEspaceDashboardAdminComponent } from './mon-espace-dashboard-admin.component';

describe('MonEspaceDashboardAdminComponent', () => {
  let component: MonEspaceDashboardAdminComponent;
  let fixture: ComponentFixture<MonEspaceDashboardAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonEspaceDashboardAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonEspaceDashboardAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
