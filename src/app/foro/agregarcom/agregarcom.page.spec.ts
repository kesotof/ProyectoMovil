import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarcomPage } from './agregarcom.page';

describe('AgregarcomPage', () => {
  let component: AgregarcomPage;
  let fixture: ComponentFixture<AgregarcomPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarcomPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
