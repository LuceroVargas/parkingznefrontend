import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Usuario } from '../../../models/usuario';
import { Rol } from '../../../models/rol';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RolService } from '../../../services/rol.service';
import { UsuarioService } from '../../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-insertareditarrol',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    MatSelectModule,
    MatButtonModule],
  templateUrl: './insertareditarrol.component.html',
  styleUrl: './insertareditarrol.component.css'
})
export class InsertareditarrolComponent {

  private _snackBar = inject(MatSnackBar);
  form: FormGroup = new FormGroup({})
  role: Rol = new Rol()
  status:boolean=true

  listaUsuarios:Usuario[]=[]

  id: number = 0
  edicion: boolean = false
  
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  constructor(
    private formBuilder: FormBuilder,
    private rS: RolService,
    private router: Router,
    private uS:UsuarioService
  ) { }


  ngOnInit(): void {

    this.form = this.formBuilder.group({
      codigoRoll:[''],
      tipoRoll: ['', Validators.required],
      usuario: ['', Validators.required]
    })
    this.uS.list().subscribe(data=>{
      this.listaUsuarios=data
    })
  }

  aceptar(){

    if (this.form.valid) {
      this.role.tipoRol = this.form.value.tipoSuscripcion
      this.role.usuario.id_usuario = this.form.value.usuario

    if (this.edicion) {
        this.rS.update(this.role).subscribe(data => {
          this.rS.list().subscribe(data => {
            this.rS.setList(data)
          })
        })
      } else {
        this.rS.insert(this.role).subscribe(data => {
          this.rS.list().subscribe(data => {
            this.rS.setList(data)
          })
        })
      }

    this.router.navigate(['suscripciones'])
    }

  }


}
