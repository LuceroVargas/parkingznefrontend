import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Pago } from '../../../models/pago';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PagoService } from '../../../services/pago.service';
import { Router } from '@angular/router';
import { SuscripcionService } from '../../../services/suscripcion.service';
import { Suscripcion } from '../../../models/suscripcion';

@Component({
  selector: 'app-insertareditarpago',
  imports: [ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule],
  templateUrl: './insertareditarpago.component.html',
  styleUrl: './insertareditarpago.component.css'
})
export class InsertareditarpagoComponent {

  private _snackBar = inject(MatSnackBar);
    form: FormGroup = new FormGroup({})
    pag: Pago = new Pago()
    status:boolean=true
  
    listaSuscripciones:Suscripcion[]=[]
  
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
      private pS:PagoService
    ) { }
  
    ngOnInit(): void {
  
      this.maxFin.setMonth(this.hoy.getMonth() + 1);
  
  
      this.form = this.formBuilder.group({
        codigoPago:[''],
        montoPago: ['', Validators.required],
        fechaPago: ['', Validators.required],
        estadoPago: ['', Validators.required],
        suscripcion: ['', Validators.required],
      })
      this.sS.list().subscribe(data=>{
        this.listaSuscripciones=data
      })
    }
  
    aceptar(){
  
      if (this.form.valid) {
        this.pag.montoPago = this.form.value.montoPago
        this.pag.fechaPago = this.form.value.tipopagoSuscripcion
        this.pag.estadoPago = this.form.value.fechainicioSuscripcion
        this.pag.suscripcion.idSuscripcion = this.form.value.usuario
  
      if (this.edicion) {
          this.pS.update(this.pag).subscribe(data => {
            this.pS.list().subscribe(data => {
              this.pS.setList(data)
            })
          })
        } else {
          this.pS.insert(this.pag).subscribe(data => {
            this.pS.list().subscribe(data => {
              this.pS.setList(data)
            })
          })
        }
  
      this.router.navigate(['pagos'])
      }
    }
    init() {
      if (this.edicion) {
        this.pS.listId(this.id).subscribe(data => {
          this.form = new FormGroup({
            codigoPago: new FormControl(data.idPago),
            montoPago: new FormControl(data.montoPago),
            fechaPago: new FormControl(data.fechaPago),
            estadoPago: new FormControl(data.estadoPago),
            suscripcion: new FormControl(data.suscripcion.idSuscripcion),
          })
        })
  
      }
    }
}
