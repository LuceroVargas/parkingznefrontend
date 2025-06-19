import { Component, OnInit } from '@angular/core';
import { TipoNotificacion } from '../../../models/tiponotificacion';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { TiponotificacionService } from '../../../services/tiponotificacion.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listartipodenotificacion',
  imports: [MatTableModule, CommonModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './listartipodenotificacion.component.html',
  styleUrl: './listartipodenotificacion.component.css'
})
export class ListartipodenotificacionComponent implements OnInit {
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
