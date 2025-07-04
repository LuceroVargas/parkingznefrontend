import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { EmpresaService } from '../../../services/empresa.service';
import { EmpresamasReservadaDTO } from '../../../models/empresamasreservadaDTO';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reporteempresamasreservada',
  imports: [MatTableModule, CommonModule],
  templateUrl: './reporteempresamasreservada.component.html',
  styleUrl: './reporteempresamasreservada.component.css'
})
export class ReporteempresamasreservadaComponent {

  displayedColumns: string[] = ['id_empresa', 'nombre_empresa', 'total_reservas'];
  dataSource: MatTableDataSource<EmpresamasReservadaDTO> = new MatTableDataSource();

  constructor(private empresaService: EmpresaService) {}

     ngOnInit(): void {
    this.empresaService.getempresamasreservada().subscribe(data => {
      this.dataSource.data = data;
    });
  }
}

