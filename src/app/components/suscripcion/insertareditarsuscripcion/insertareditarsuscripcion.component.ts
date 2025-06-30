import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import { Suscripcion } from '../../../models/suscripcion';
import { SuscripcionService } from '../../../services/suscripcion.service';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-insertareditarsuscripcion',
  providers: [provideNativeDateAdapter()],

  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule],
  templateUrl: './insertareditarsuscripcion.component.html',
  styleUrl: './insertareditarsuscripcion.component.css'
})
export class InsertareditarsuscripcionComponent implements OnInit {
  private _snackBar = inject(MatSnackBar);
  form: FormGroup = new FormGroup({})
  suscri: Suscripcion = new Suscripcion()
  status:boolean=true

  listaUsuarios:Usuario[]=[]

  id: number = 0
  edicion: boolean = false

  hoy = new Date();
  maxFin = new Date();
  
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  constructor(
    private formBuilder: FormBuilder,
    private sS: SuscripcionService,
    private router: Router,
    private uS:UsuarioService
  ) { }


  ngOnInit(): void {

    this.maxFin.setMonth(this.hoy.getMonth() + 1);


    this.form = this.formBuilder.group({
      codigoSuscripcion:[''],
      tipoSuscripcion: ['', Validators.required],
      estadoSuscripcion: ['', Validators.required],
      tipopagoSuscripcion: ['', Validators.required],
      renovacionSuscripcion: ['', Validators.required],
      fechainicioSuscripcion: [this.hoy, Validators.required],
      fechafinSuscripcion: [this.maxFin, Validators.required],
      usuario: ['', Validators.required]
    })
    this.uS.list().subscribe(data=>{
      this.listaUsuarios=data
    })
  }

  aceptar(){

    if (this.form.valid) {
      this.suscri.TipoSuscripcion = this.form.value.tipoSuscripcion
      this.suscri.estado = this.form.value.estadoSuscripcion
      this.suscri.tipoPago = this.form.value.tipopagoSuscripcion
      this.suscri.renovada = this.form.value.renovacionSuscripcion
      this.suscri.fechaInicio = this.form.value.fechainicioSuscripcion
      this.suscri.fechaFin = this.form.value.fechafinSuscripcion
      this.suscri.usuario.id_usuario = this.form.value.usuario

    if (this.edicion) {
        this.sS.update(this.suscri).subscribe(data => {
          this.sS.list().subscribe(data => {
            this.sS.setList(data)
          })
        })
      } else {
        this.sS.insert(this.suscri).subscribe(data => {
          this.sS.list().subscribe(data => {
            this.sS.setList(data)
          })
        })
      }

    this.router.navigate(['suscripciones'])
    }
  }
  init() {
    if (this.edicion) {
      this.sS.listId(this.id).subscribe(data => {
        this.form = new FormGroup({
          codigoUsuario: new FormControl(data.idSuscripcion),
          tipoSuscripcion: new FormControl(data.TipoSuscripcion),
          estadoSuscripcion: new FormControl(data.estado),
          tipopagoSuscripcion: new FormControl(data.tipoPago),
          renovacionSuscripcion: new FormControl(data.renovada),
          fechainicioSuscripcion: new FormControl(data.fechaInicio),
          fechafinSuscripcion: new FormControl(data.fechaFin),
          usuario: new FormControl(data.usuario.id_usuario),


        })
      })

    }
  }
}
