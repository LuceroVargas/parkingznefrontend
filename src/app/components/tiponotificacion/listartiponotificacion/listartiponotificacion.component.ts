import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { TipoNotificacion } from '../../../models/tiponotificacion';
import { TiponotificacionService } from '../../../services/tiponotificacion.service';

@Component({
  selector: 'app-listartiponotificacion',
  imports: [MatTableModule, CommonModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './listartiponotificacion.component.html',
  styleUrl: './listartiponotificacion.component.css'
})
export class ListartiponotificacionComponent implements OnInit{

  dataSource: MatTableDataSource<TipoNotificacion> = new MatTableDataSource()
  displayedColumns: string[] = ['c1', 'c2','c3', 'c4']
  constructor(private tpS: TiponotificacionService) { }

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
