import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListartipodenotificacionComponent } from './listartipodenotificacion/listartipodenotificacion.component';

@Component({
  selector: 'app-tiponotificacion',
  imports: [RouterOutlet, ListartipodenotificacionComponent],
  templateUrl: './tiponotificacion.component.html',
  styleUrl: './tiponotificacion.component.css'
})
export class TiponotificacionComponent {
  constructor(public route:ActivatedRoute) { }
  
}
