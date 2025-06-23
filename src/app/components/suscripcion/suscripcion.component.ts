import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarsuscripcionComponent } from './listarsuscripcion/listarsuscripcion.component';

@Component({
  selector: 'app-suscripcion',
  imports: [RouterOutlet, ListarsuscripcionComponent],
  templateUrl: './suscripcion.component.html',
  styleUrl: './suscripcion.component.css'
})
export class SuscripcionComponent {
  constructor(public route: ActivatedRoute) { }
}
