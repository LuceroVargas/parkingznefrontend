import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import {MatPaginator} from '@angular/material/paginator';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-listarusuario',
  imports: [MatTableModule, 
    CommonModule, 
    MatButtonModule, 
    MatIconModule, 
    RouterModule, MatPaginator, MatFormFieldModule],
  templateUrl: './listarusuario.component.html',
  styleUrl: './listarusuario.component.css'
})
export class ListarusuarioComponent implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource()
  displayedColumns: string[] = ['c1', 'c2','c3', 'c4', 'c5', 'c6','c7', 'c8', 'c9', 'c10','c11', 'c12', 'c13']
  notResults:boolean=false
  form:FormGroup
  totalUsuarios: number = 0;

  constructor(private uS: UsuarioService, private fb:FormBuilder) {
    this.form=fb.group({
    }) }

  

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
    });
  }


  ngOnInit(): void {
    this.uS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
      this.totalUsuarios = data.length;
    })
    this.uS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })

  }

  eliminar(id: number) {
    this.uS.eliminar(id).subscribe(data=>{
      this.uS.list().subscribe(data=>{
        this.uS.setList(data)
      })
    })
  }
}
