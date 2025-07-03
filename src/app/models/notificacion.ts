import { TipoNotificacion } from "./tiponotificacion"
import { Usuario } from "./usuario"

export class Notificacion {
    idNotificacion: number = 0
    mensaje: String = ""
    fechaEmision:  Date= new Date()
    fechaProgramada:   Date= new Date()
    estado: String = ""
    usuario :Usuario =new Usuario
    TipoNotificacion: TipoNotificacion =new TipoNotificacion
   //Reserva: Reserva = new this.Reserva
   //Reclamo: Reclamo = new this.Reclamo
}












