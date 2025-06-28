import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarempresaComponent } from './listarempresa.component';

describe('ListarempresaComponent', () => {
  let component: ListarempresaComponent;
  let fixture: ComponentFixture<ListarempresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarempresaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarempresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
