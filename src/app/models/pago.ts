import { Suscripcion } from "./suscripcion"

export class Pago {
    idPago: number = 0
    montoPago: number = 0
    fechaPago:  Date = new Date()
    estadoPago: String = ""
    suscripcion: Suscripcion = new Suscripcion
}