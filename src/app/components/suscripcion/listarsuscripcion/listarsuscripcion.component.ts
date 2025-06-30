import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Suscripcion } from '../../../models/suscripcion';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SuscripcionService } from '../../../services/suscripcion.service';
import { CommonModule } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-listarsuscripcion',
  imports: [MatTableModule, 
    CommonModule, 
    MatButtonModule, 
    MatIconModule, 
    RouterModule, MatPaginator, MatFormFieldModule],
  templateUrl: './listarsuscripcion.component.html',
  styleUrl: './listarsuscripcion.component.css'
})
export class ListarsuscripcionComponent implements OnInit, AfterViewInit{

  dataSource: MatTableDataSource<Suscripcion> = new MatTableDataSource()
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8']
  notResults:boolean=false
  form:FormGroup
  totalSuscripciones: number = 0;

  constructor(private sS: SuscripcionService, private fb:FormBuilder) {
        this.form=fb.group({
  })
   }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
    });
  }

  ngOnInit(): void {
    this.sS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
    this.sS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
  }

    eliminar(id: number) {
    this.sS.eliminar(id).subscribe(data=>{
      this.sS.list().subscribe(data=>{
        this.sS.setList(data)
      })
    })
  }

}
