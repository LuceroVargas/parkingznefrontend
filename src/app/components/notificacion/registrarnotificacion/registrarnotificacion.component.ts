import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Notificacion } from '../../../models/notificacion';
import { Usuario } from '../../../models/usuario';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { NotificacionService } from '../../../services/notificacion.service';
import { TipoNotificacion } from '../../../models/tiponotificacion';

@Component({
  selector: 'app-registrarnotificacion',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatButtonModule,
    RouterLink,
    MatRadioModule
  ],
  templateUrl: './registrarnotificacion.component.html',
  styleUrl: './registrarnotificacion.component.css'
})
export class RegistrarnotificacionComponent {
 
  form: FormGroup = new FormGroup({})
  notificacion: Notificacion= new Notificacion()

  listaUsuarios:Usuario[]=[]
  listatipoNotificacion:TipoNotificacion[]=[]


  id: number = 0
  edicion: boolean = false
  maxDate!: Date;

  constructor(private nS: NotificacionService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
    
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {

      this.id = data['id']
      this. edicion = data['id'] != null

      this.init()
    }
    )
    const today = new Date();
    today.setHours(0, 0, 0, 0); 
    this.maxDate = new Date(today);
    this.maxDate.setDate(today.getDate() - 1);

    this.form = this.formBuilder.group({
      codigoNotificacion: [''],
      nombreUsuario: ['', Validators.required],
      mensaje: ['', Validators.required],
      fechaEmision: [null, Validators.required],
      fechaProgramada: ['', Validators.required],
      estado: ['', Validators.required],
      usuario: ['', Validators.required],
      tipoNotificacion: ['', Validators.required],
      Reserva: ['', Validators.required],
      Reclamo: ['', Validators.required],
     
    })
  }

  aceptar() {
    if (this.form.valid) {
      this.notificacion.idNotificacion = this.form.value.codigoNotificacion
      this.notificacion.mensaje = this.form.value.mensaje
      this.notificacion.fechaEmision = this.form.value.fechaEmision
      this.notificacion.fechaProgramada = this.form.value.fechaProgramada
      this.notificacion.estado= this.form.value.estado
      this.notificacion.usuario = new Usuario();
      this.notificacion.usuario.id_usuario = this.form.value.usuario
      this.notificacion.TipoNotificacion.idTipoNotificacion= this.form.value.tipoNotificacion
  //  this.notificacion.Reserva= this.form.value.reserva
  //  this.notificacion.Reclamo= this.form.value.reclamo


      if (this.edicion) {
        this.nS.update(this.notificacion).subscribe(data => {
          this.nS.list().subscribe(data => {
            this.nS.setList(data)
          })
        })
        
      } else {
        this.nS.insert(this.notificacion).subscribe(data => {
          this.nS.list().subscribe(data => {
            this.nS.setList(data)
          })
        })
      }
      this.router.navigate(['notificacion'])
    }
  }

  init() { 
    if (this.edicion) {
      this.nS.listId(this.id).subscribe(data => {
        this.form = new FormGroup({
          codigoNotificacion: new FormControl(data.idNotificacion ),
          mensaje: new FormControl(data.mensaje),
          fechaEmision: new FormControl(data.fechaEmision),
          fechaProgramada: new FormControl(data.fechaProgramada),
          estado: new FormControl(data.estado),
          usuario: new FormControl(data.usuario.id_usuario),
          tipoNotificacion: new FormControl(data.TipoNotificacion.idTipoNotificacion),
        

        })
      })

    }
  }
}
