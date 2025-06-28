import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Empresa } from '../../../models/empresa';
import { EmpresaService } from '../../../services/empresa.service';

@Component({
  selector: 'app-buscarempresa',
  imports: [ MatTableModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule],
  templateUrl: './buscarempresa.component.html',
  styleUrl: './buscarempresa.component.css'
})
export class BuscarempresaComponent {


    dataSource: MatTableDataSource<Empresa> = new MatTableDataSource()
  displayedColumns: string[] = ['c1', 'c2','c3', 'c4','c5']
  form: FormGroup;

  mensaje: string = ""
  notResults: boolean = false


  constructor(
    private eS: EmpresaService,
    private fb: FormBuilder) {
    this.form = fb.group({
      codigo: ['']
    })
  }

  ngOnInit(): void {
    this.eS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
 
  }
  
  
}
