import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MedicinasPage } from './medicinas.page';

describe('MedicinasPage', () => {
  let component: MedicinasPage;
  let fixture: ComponentFixture<MedicinasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicinasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
