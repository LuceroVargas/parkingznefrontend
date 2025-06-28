import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Empresa } from '../../../models/empresa';
import { EmpresaService } from '../../../services/empresa.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-insertarempresa',
  imports: [MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatButtonModule
   ],
  templateUrl: './insertarempresa.component.html',
  styleUrl: './insertarempresa.component.css'
})
export class InsertarempresaComponent {


  form: FormGroup = new FormGroup({})
  empresa: Empresa = new Empresa()

  
  id: number = 0
  edicion: boolean = false


  constructor(private eS: EmpresaService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
        this.form = this.formBuilder.group({
        codigo: [''],
        nombre: ['', Validators.required],
        direccion: ['', Validators.required],
        tipoEmpresa: ['', Validators.required],
        usuario: ['', Validators.required]
    });
    
    // this.uS.list().subscribe(data=>{
     //this.listaUsuarios=data
    //})
  }

  aceptar() {
    if (this.form.valid) {
        this.empresa.idEmpresa = this.form.value.codigo;
        this.empresa.nombreEmpresa = this.form.value.nombre;
        this.empresa.direccionEmpresa = this.form.value.direccion;
        this.empresa.tipoEmpresa = this.form.value.tipoEmpresa;
       // this.empresa.usuario = { id_usuario: this.form.value.usuario };

      if (this.edicion) {
        //actualizar
        this.eS.update(this.empresa).subscribe(data => {
          this.eS.list().subscribe(data => {
            this.eS.setList(data)
          })
        })
      } else {
        //INSERTAR
        this.eS.insert(this.empresa).subscribe(data => {
          this.eS.list().subscribe(data => {
            this.eS.setList(data)
          })
        })
      }
      this.router.navigate(['Empresas'])
    }
  }
  init() {
    if (this.edicion) {
      this.eS.listId(this.id).subscribe(data => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idEmpresa),
          nombre: new FormControl(data.nombreEmpresa),
          direccion: new FormControl(data.direccionEmpresa),
          tipoEmpresa: new FormControl(data.tipoEmpresa),
        //  usuario: new FormControl(data.usuario.id_usuario),
        })
      })

    }
  }



}
