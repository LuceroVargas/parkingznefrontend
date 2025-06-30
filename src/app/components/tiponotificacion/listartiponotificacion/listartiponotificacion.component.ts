import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import { TipoNotificacion } from '../../../models/tiponotificacion';
import { TiponotificacionService } from '../../../services/tiponotificacion.service';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-listartiponotificacion',
  imports: [MatTableModule, CommonModule, MatButtonModule, MatIconModule, RouterModule, MatPaginator, MatFormFieldModule],
  templateUrl: './listartiponotificacion.component.html',
  styleUrl: './listartiponotificacion.component.css'
})
export class ListartiponotificacionComponent implements OnInit, AfterViewInit{

  dataSource: MatTableDataSource<TipoNotificacion> = new MatTableDataSource()
  displayedColumns: string[] = ['c1', 'c2','c3', 'c4','c5' ]

  notResults:boolean=false
  totalTiponotificaciones: number = 0;
  constructor(private tpS: TiponotificacionService) { 
   
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
    });
  }

  ngOnInit(): void {
    this.tpS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
    this.tpS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })

  }

  eliminar(id: number) {
    this.tpS.deleteS(id).subscribe(data=>{
      this.tpS.list().subscribe(data=>{
        this.tpS.setList(data)
      })
    })
  }
}
