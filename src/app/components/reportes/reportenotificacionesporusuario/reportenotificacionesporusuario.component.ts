import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NotificacionporUsuarioDTO} from '../../../models/notificacionporusuarioDTO';
import { NotificacionService } from '../../../services/notificacion.service';



@Component({
  selector: 'app-reportenotificacionesporusuario',
  imports: [MatTableModule],
  templateUrl: './reportenotificacionesporusuario.component.html',
  styleUrl: './reportenotificacionesporusuario.component.css'
})
export class ReportenotificacionesporusuarioComponent implements OnInit{

displayedColumns: string[] = ['tipoDeNotificacion', 'mensaje', 'fechaEmision', 'estado', 'id_usuario'];
  dataSource: MatTableDataSource<NotificacionporUsuarioDTO> = new MatTableDataSource();

  constructor(private notificacionService: NotificacionService) {}

  ngOnInit(): void {
    this.notificacionService.getnoticacionUsuario().subscribe(data => {
      this.dataSource.data = data;
    });
  }

}
