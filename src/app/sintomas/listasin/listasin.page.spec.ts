import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListasinPage } from './listasin.page';

describe('ListasinPage', () => {
  let component: ListasinPage;
  let fixture: ComponentFixture<ListasinPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListasinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
