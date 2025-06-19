import { Component } from '@angular/core';
import { TipoNotificacion } from '../../../models/tiponotificacion';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TiponotificacionService } from '../../../services/tiponotificacion.service';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-insertareditar',
  imports: [MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatButtonModule,
    RouterLink] ,
  templateUrl: './insertareditar.component.html',
  styleUrl: './insertareditar.component.css'
})
export class InsertareditarComponent {

  form: FormGroup = new FormGroup({})
  tiponotificacion: TipoNotificacion = new TipoNotificacion()

  
  id: number = 0
  edicion: boolean = false


  constructor(private tpS: TiponotificacionService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {

      this.id = data['id']
      this.edicion = data['id'] != null
      //actualizar
      this.init()
    }
    )

    this.form = this.formBuilder.group({
      codigo: [''],
      descripcion: ['', Validators.required],
    })
  }

  aceptar() {
    if (this.form.valid) {
      this.tiponotificacion.idTipoNotificacion = this.form.value.codigo
      this.tiponotificacion.descripcion = this.form.value.descripcion

      if (this.edicion) {
        //actualizar
        this.tpS.update(this.tiponotificacion).subscribe(data => {
          this.tpS.list().subscribe(data => {
            this.tpS.setList(data)
          })
        })
      } else {
        //INSERTAR
        this.tpS.insert(this.tiponotificacion).subscribe(data => {
          this.tpS.list().subscribe(data => {
            this.tpS.setList(data)
          })
        })
      }
      this.router.navigate(['tiponotificaciones'])
    }
  }
  init() {
    if (this.edicion) {
      this.tpS.listId(this.id).subscribe(data => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idTipoNotificacion),
          descripcion: new FormControl(data.descripcion),
        })
      })

    }
  }
}
