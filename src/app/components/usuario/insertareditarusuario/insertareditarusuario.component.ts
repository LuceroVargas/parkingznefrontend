import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Usuario } from '../../../models/usuario';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { UsuarioService } from '../../../services/usuario.service';
import {MatRadioModule} from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GoogleMapsModule } from '@angular/google-maps';



@Component({
  selector: 'app-insertareditarusuario',
  providers: [provideNativeDateAdapter()],
  imports: [ MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatButtonModule,
    RouterLink,
    MatRadioModule,
    MatIconModule,
    GoogleMapsModule],
  templateUrl: './insertareditarusuario.component.html',
  styleUrl: './insertareditarusuario.component.css'
})
export class InsertareditarusuarioComponent implements OnInit {
  private _snackBar = inject(MatSnackBar);
  form: FormGroup = new FormGroup({})
  usuario: Usuario = new Usuario()
  
  id: number = 0
  edicion: boolean = false
  maxDate!: Date;
  hidePassword: boolean = true;

  
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  center: google.maps.LatLngLiteral = { lat: -12.0464, lng: -77.0428 }; 
  zoom = 12;

  markerPosition: google.maps.LatLngLiteral | null = null;

      onMapClick(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();

      this.center = { lat, lng };
      this.markerPosition = this.center;

      this.form.patchValue({
        latitudUsuario: lat,
        longitudUsuario: lng
      });
    }
  }

    onMarkerDragEnd(event: google.maps.MapMouseEvent) {
      if (event.latLng) {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();

        this.markerPosition = { lat, lng };
        this.center = this.markerPosition;

        this.form.patchValue({
          latitudUsuario: lat,
          longitudUsuario: lng
        });
      }
    }




  constructor(private uS: UsuarioService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute, 
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
      codigoUsuario: [''],
      nombreUsuario: ['', Validators.required],
      apellidosUsuario: ['', Validators.required],
      fechaNacimientoUsuario: [null, Validators.required],
      correoUsuario: ['', [Validators.required, Validators.email]],
      placaAutoUsuario: ['', [Validators.required,Validators.pattern(/^([A-Z]{3}\d{3}|[A-Z]\d[A-Z]\d{3})$/)]],
      latitudUsuario: ['', [Validators.required, Validators.min(-90), Validators.max(90)]],
      longitudUsuario: ['', [Validators.required, Validators.min(-180), Validators.max(180)]],
      telefonoUsuario: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      usernameUsuario: ['', Validators.required],
      passwordUsuario: ['', Validators.required],
      enabledUsuario: ['', Validators.required]
    })
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;

      this.init();

      if (this.form.value.latitudUsuario && this.form.value.longitudUsuario) {
        this.center = {
          lat: +this.form.value.latitudUsuario,
          lng: +this.form.value.longitudUsuario
        };
      }
    });
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
        this.uS.update(this.usuario).subscribe(data => {
          this.uS.list().subscribe(data => {
            this.uS.setList(data)
            this.openSnackBar('Usuario actualizado correctamente', 'Cerrar')
          })
        })
      } else {
        this.uS.insertar(this.usuario).subscribe(data => {
          this.uS.list().subscribe(data => {
            this.uS.setList(data)
            this.openSnackBar('Usuario registrado correctamente', 'Cerrar')
          })
        })
      }
      this.router.navigate(['usuarios/formularioUsuario'])
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
        if (data.latitudUsuario != null && data.longitudUsuario != null) {
          this.center = {
            lat: data.latitudUsuario,
            lng: data.longitudUsuario
          };
          this.markerPosition = this.center;
          this.zoom = 15; // opcional, para acercar el mapa al marcador
        }
                
      })
      
      

    }

    
  }
}
