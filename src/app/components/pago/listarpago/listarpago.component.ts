import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Pago } from '../../../models/pago';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PagoService } from '../../../services/pago.service';
import { MatPaginator } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-listarpago',
  imports: [MatTableModule, 
    CommonModule, 
    MatButtonModule, 
    MatIconModule, 
    RouterModule, MatFormFieldModule, MatPaginator],
  templateUrl: './listarpago.component.html',
  styleUrl: './listarpago.component.css'
})
export class ListarpagoComponent implements OnInit, AfterViewInit{
  
  dataSource: MatTableDataSource<Pago> = new MatTableDataSource()
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7']
  notResults:boolean=false
  form:FormGroup
  totalPagos: number = 0;

  constructor(private pS: PagoService, private fb:FormBuilder) {
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
    this.pS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
      this.totalPagos = data.length;
    })
      this.pS.getList().subscribe(data => {
        this.dataSource = new MatTableDataSource(data)
      })
    }
  
    eliminar(id: number) {
      this.pS.eliminar(id).subscribe(data=>{
        this.pS.list().subscribe(data=>{
          this.pS.setList(data)
        })
      })
    }

}
