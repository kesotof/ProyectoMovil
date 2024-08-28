import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CuentaaPage } from './cuentaa.page';

describe('CuentaaPage', () => {
  let component: CuentaaPage;
  let fixture: ComponentFixture<CuentaaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentaaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
