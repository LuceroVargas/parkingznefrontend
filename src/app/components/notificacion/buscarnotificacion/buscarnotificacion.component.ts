import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NotificacionService } from '../../../services/notificacion.service';
import { Notificacion } from '../../../models/notificacion';

@Component({
  selector: 'app-buscarnotificacion',
  imports: [
    MatTableModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './buscarnotificacion.component.html',
  styleUrl: './buscarnotificacion.component.css'
})


export class BuscarnotificacionComponent {


    dataSource: MatTableDataSource<Notificacion> = new MatTableDataSource()
    displayedColumns: string[] = ['c1', 'c2','c3', 'c4','c5','c6','c7','c8','c9','c10']
    form: FormGroup;

  mensaje: string = ""
  notResults: boolean = false


  constructor(
    private nS: NotificacionService,
    private fb: FormBuilder) {
    this.form = fb.group({
      codigo: ['']
    })
  }


 ngOnInit(): void {
    this.nS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
 
  }


}
