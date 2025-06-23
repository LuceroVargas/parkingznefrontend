import { Usuario } from "./usuario"

export class Suscripcion {
    idSuscripcion: number = 0
    TipoSuscripcion: String = ""
    estado:  String = ""
    tipoPago: String = ""
    renovada: number= 0
    fechaInicio: Date= new Date()
    fechaFin: Date=new Date()
    usuario: Usuario =new Usuario

}