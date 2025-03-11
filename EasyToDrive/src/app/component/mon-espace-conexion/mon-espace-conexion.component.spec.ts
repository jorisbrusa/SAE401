import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonEspaceConexionComponent } from './mon-espace-conexion.component';

describe('MonEspaceConexionComponent', () => {
  let component: MonEspaceConexionComponent;
  let fixture: ComponentFixture<MonEspaceConexionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonEspaceConexionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonEspaceConexionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
