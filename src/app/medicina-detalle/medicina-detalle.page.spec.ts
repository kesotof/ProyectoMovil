import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MedicinaDetallePage } from './medicina-detalle.page';

describe('MedicinaDetallePage', () => {
  let component: MedicinaDetallePage;
  let fixture: ComponentFixture<MedicinaDetallePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicinaDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
