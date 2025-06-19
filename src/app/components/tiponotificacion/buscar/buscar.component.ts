import { Component, OnInit } from '@angular/core';
import { TipoNotificacion } from '../../../models/tiponotificacion';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TiponotificacionService } from '../../../services/tiponotificacion.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-buscar',
  imports: [
    MatTableModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './buscar.component.html',
  styleUrl: './buscar.component.css'
})
export class BuscarComponent implements OnInit {

  dataSource: MatTableDataSource<TipoNotificacion> = new MatTableDataSource()
  displayedColumns: string[] = ['c1', 'c2']
  form: FormGroup;

  mensaje: string = ""
  notResults: boolean = false


  constructor(
    private tpS: TiponotificacionService,
    private fb: FormBuilder) {
    this.form = fb.group({
      codigo: ['']
    })
  }

  ngOnInit(): void {
    this.tpS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
 
  }
  
  
}
