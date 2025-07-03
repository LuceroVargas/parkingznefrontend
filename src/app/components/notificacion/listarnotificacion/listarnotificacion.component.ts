import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { NotificacionService } from '../../../services/notificacion.service';
import { Notificacion } from '../../../models/notificacion';

@Component({
  selector: 'app-listarnotificacion',
  imports: [MatTableModule, CommonModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './listarnotificacion.component.html',
  styleUrl: './listarnotificacion.component.css'
})
export class ListarnotificacionComponent implements  OnInit {

dataSource: MatTableDataSource<Notificacion> = new MatTableDataSource()
  displayedColumns: string[] = ['c1', 'c2','c3', 'c4','c5','c6','c7', 'c8','c9','c10']
  constructor(private nS: NotificacionService) { }

  ngOnInit(): void {
    this.nS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)

    })
    this.nS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })

  }

  eliminar(id: number) {
    this.nS.deleteS(id).subscribe(data=>{
      this.nS.list().subscribe(data=>{
        this.nS.setList(data)
      })
    })
  }
}
