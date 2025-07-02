import { Injectable } from '@angular/core';
import { Suscripcion } from '../models/suscripcion';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Pago } from '../models/pago';
import { environment } from '../../environments/environment';

const base_url = environment.base
 
@Injectable({
  providedIn: 'root'
})
export class PagoService {


  private url = `${base_url}/roles`
  private listaCambio = new Subject<Pago[]>()
  
  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Pago[]>(this.url)
  }

  insert(p: Pago) {
    return this.http.post(this.url, p, { responseType: 'text' });
  }
  getList() {
    return this.listaCambio.asObservable()
  }

  setList(listaNueva: Pago[]) {
      this.listaCambio.next(listaNueva)
    }

  listId(id: number) {
    return this.http.get<Pago>(`${this.url}/${id}`)
  }

  update(p: Pago) {
      return this.http.put(this.url, p)
  }
  
  eliminar(id:number) {
    return this.http.delete(`${this.url}/${id}`)
  }
  
}
