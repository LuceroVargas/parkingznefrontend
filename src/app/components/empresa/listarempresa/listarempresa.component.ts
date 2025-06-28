import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { EmpresaService } from '../../../services/empresa.service';
import { Empresa } from '../../../models/empresa';

@Component({
  selector: 'app-listarempresa',
  imports: [ MatTableModule, CommonModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './listarempresa.component.html',
  styleUrl: './listarempresa.component.css'
})
export class ListarempresaComponent implements OnInit {

dataSource: MatTableDataSource<Empresa> = new MatTableDataSource()
  displayedColumns: string[] = ['c1', 'c2','c3', 'c4','c5']
  constructor(private tpS: EmpresaService) { }

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
