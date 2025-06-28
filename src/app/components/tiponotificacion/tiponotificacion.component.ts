import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListartiponotificacionComponent } from './listartiponotificacion/listartiponotificacion.component';

@Component({
  selector: 'app-tiponotificacion',
  imports: [RouterOutlet,ListartiponotificacionComponent],
  templateUrl: './tiponotificacion.component.html',
  styleUrl: './tiponotificacion.component.css'
})
export class TiponotificacionComponent {
  constructor(public route:ActivatedRoute) { }
  
}
