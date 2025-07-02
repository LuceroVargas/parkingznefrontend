import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Rol } from '../models/rol';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
const base_url = environment.base

@Injectable({
  providedIn: 'root'
})
export class RolService {
  
  private url = `${base_url}/roles`
  private listaCambio = new Subject<Rol[]>()

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Rol[]>(this.url)
  }

  insert(r: Rol) {
    return this.http.post(this.url, r, { responseType: 'text' });
  }
  getList() {
    return this.listaCambio.asObservable()
  }
  setList(listaNueva: Rol[]) {
    this.listaCambio.next(listaNueva)
  }

  listId(id: number) {
    return this.http.get<Rol>(`${this.url}/${id}`)
  }

  update(s: Rol) {
      return this.http.put(this.url, s)
  }
  
  eliminar(id:number) {
    return this.http.delete(`${this.url}/${id}`)
  }
}
