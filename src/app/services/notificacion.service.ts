import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Notificacion } from '../models/notificacion';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
const base_url = environment.base


@Injectable({
  providedIn: 'root'
})
export class NotificacionService {


   private listaCambio = new Subject<Notificacion[]>()
    private url = `${base_url}/notificaciones`

  constructor(private http: HttpClient) { }
  list() {
      return this.http.get<Notificacion[]>(this.url)
    }
  
    insert(n: Notificacion) {
      return this.http.post(this.url, n)
    }
    getList() {
      return this.listaCambio.asObservable()
    }
    setList(listaNueva: Notificacion[]) {
      this.listaCambio.next(listaNueva)
    }
  
    listId(id: number) {
      return this.http.get<Notificacion>(`${this.url}/${id}`)
    }
  
    update(n: Notificacion) {
        return this.http.put(this.url, n)
    }
    
    deleteS(id:number) {
      return this.http.delete(`${this.url}/${id}`)
    }
  
}
