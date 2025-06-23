import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Usuario } from '../../../models/usuario';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { MatNativeDateModule } from '@angular/material/core';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-insertareditarusuario',
  imports: [ MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatButtonModule,
    RouterLink],
  templateUrl: './insertareditarusuario.component.html',
  styleUrl: './insertareditarusuario.component.css'
})
export class InsertareditarusuarioComponent implements OnInit {
  form: FormGroup = new FormGroup({})
  usuario: Usuario = new Usuario()
  
  id: number = 0
  edicion: boolean = false

  constructor(private uS: UsuarioService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {

      this.id = data['id']
      this. edicion = data['id'] != null
      //actualizar
      this.init()
    }
    )

    this.form = this.formBuilder.group({
      codigoUsuario: [''],
      nombreUsuario: ['', Validators.required],
      apellidosUsuario: ['', Validators.required],
      fechaNacimientoUsuario: ['', Validators.required],
      correoUsuario: ['', Validators.required],
      placaAutoUsuario: ['', Validators.required],
      latitudUsuario: ['', Validators.required],
      longitudUsuario: ['', Validators.required],
      telefonoUsuario: ['', Validators.required],
      usernameUsuario: ['', Validators.required],
      passwordUsuario: ['', Validators.required],
      enabledUsuario: ['', Validators.required]
    })
  }

  aceptar() {
    if (this.form.valid) {
      this.usuario.id_usuario = this.form.value.codigoUsuario
      this.usuario.nombre = this.form.value.nombreUsuario
      this.usuario.apellidos = this.form.value.apellidosUsuario
      this.usuario.fechanacimiento = this.form.value.fechaNacimientoUsuario
      this.usuario.correo = this.form.value.correoUsuario
      this.usuario.placaAuto= this.form.value.placaAutoUsuario
      this.usuario.latitudUsuario = this.form.value.latitudUsuario
      this.usuario.longitudUsuario= this.form.value.longitudUsuario
      this.usuario.telefono= this.form.value.telefonoUsuario
      this.usuario.username= this.form.value.usernameUsuario
      this.usuario.password= this.form.value.passwordUsuario
      this.usuario.enabled= this.form.value.enabledUsuario

      if (this.edicion) {
        //actualizar
        this.uS.update(this.usuario).subscribe(data => {
          this.uS.list().subscribe(data => {
            this.uS.setList(data)
          })
        })
      } else {
        //INSERTAR
        this.uS.insert(this.usuario).subscribe(data => {
          this.uS.list().subscribe(data => {
            this.uS.setList(data)
          })
        })
      }
      this.router.navigate(['usuarios'])
    }
  }
  init() { 
    if (this.edicion) {
      this.uS.listId(this.id).subscribe(data => {
        this.form = new FormGroup({
          codigoUsuario: new FormControl(data.id_usuario ),
          nombreUsuario: new FormControl(data.nombre),
          apellidosUsuario: new FormControl(data.apellidos),
          fechaNacimientoUsuario: new FormControl(data.fechanacimiento),
          correoUsuario: new FormControl(data.correo),
          placaAutoUsuario: new FormControl(data.placaAuto),
          latitudUsuario: new FormControl(data.latitudUsuario),
          longitudUsuario: new FormControl(data.longitudUsuario),
          telefonoUsuario: new FormControl(data.telefono),
          usernameUsuario: new FormControl(data.username),
          passwordUsuario: new FormControl(data.password),
          enabledUsuario: new FormControl(data.enabled),

        })
      })

    }
  }


}
