import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TipoNotificacion } from '../models/tiponotificacion';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

const base_url = environment.base

@Injectable({
  providedIn: 'root'
})
export class TiponotificacionService {

  private listaCambio = new Subject<TipoNotificacion[]>()

  private url = `${base_url}/tiponotificaciones`

  constructor(private http: HttpClient) { }
  
  list() {
    return this.http.get<TipoNotificacion[]>(this.url)
  }
  insert(tp: TipoNotificacion) {
    return this.http.post(this.url, tp)
  }

  setList(listaNueva: TipoNotificacion[]) {
    this.listaCambio.next(listaNueva)
  }
  getList() {
    return this.listaCambio.asObservable()
  }

  listId(id: number) {
    return this.http.get<TipoNotificacion>(`${this.url}/${id}`)
  }

  update(tp: TipoNotificacion) {
    return this.http.put(this.url, tp)
  }

  deleteS(id:number) {
    return this.http.delete(`${this.url}/${id}`)
  }


  searchTypeNotification(id:number){
    return this.http.get<TipoNotificacion[]>(`${this.url}/busquedas/${id}`)
  }
  
}
