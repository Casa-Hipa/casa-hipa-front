import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoTiendaComponent } from './listado-tienda.component';

describe('ListadoTiendaComponent', () => {
  let component: ListadoTiendaComponent;
  let fixture: ComponentFixture<ListadoTiendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoTiendaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoTiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
