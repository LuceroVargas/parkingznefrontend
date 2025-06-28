import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertarempresaComponent } from './insertarempresa.component';

describe('InsertarempresaComponent', () => {
  let component: InsertarempresaComponent;
  let fixture: ComponentFixture<InsertarempresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsertarempresaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertarempresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
