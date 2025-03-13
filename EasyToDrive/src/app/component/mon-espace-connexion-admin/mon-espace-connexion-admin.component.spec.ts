import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonEspaceConnexionAdminComponent } from './mon-espace-connexion-admin.component';

describe('MonEspaceConnexionAdminComponent', () => {
  let component: MonEspaceConnexionAdminComponent;
  let fixture: ComponentFixture<MonEspaceConnexionAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonEspaceConnexionAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonEspaceConnexionAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
