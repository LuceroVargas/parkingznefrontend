import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-buscarusuario',
  imports: [ MatTableModule,
    ReactiveFormsModule,
    CommonModule,
    MatLabel,
    MatFormFieldModule,
    MatInputModule],
  templateUrl: './buscarusuario.component.html',
  styleUrl: './buscarusuario.component.css'
})
export class BuscarusuarioComponent implements OnInit {

  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c9', 'c10','c11']

  
  nombrebusqueda: string = "";
  mensaje: string = "";  
  form: FormGroup; 
  noResults: boolean = false; 

  constructor(private uS: UsuarioService, private fb: FormBuilder) {

    this.form = this.fb.group({
      nombrebusqueda: [''],
    });

  }
  ngOnInit(): void {
    this.uS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
      this.form.get('nombrebusqueda')?.valueChanges.subscribe((value) => {
      this.nombrebusqueda = value; 
      this.buscar(); 
    });
  }
  
  buscar() {
    if (this.nombrebusqueda.trim()) {
      this.uS.buscarPlaca(this.nombrebusqueda).subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.noResults = data.length === 0; 

      });
    } else {
      this.uS.list().subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.noResults = false;
      });
    }
  }
}
