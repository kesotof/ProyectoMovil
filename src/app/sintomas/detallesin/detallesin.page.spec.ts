import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetallesinPage } from './detallesin.page';

describe('DetallesinPage', () => {
  let component: DetallesinPage;
  let fixture: ComponentFixture<DetallesinPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
