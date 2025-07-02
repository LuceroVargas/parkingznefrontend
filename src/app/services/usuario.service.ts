import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
const base_url = environment.base
@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  private listaCambio = new Subject<Usuario[]>()
  private url = `${base_url}/usuarios`
  
  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Usuario[]>(this.url)
  }

  insertar(u: Usuario) {
  return this.http.post(this.url, u, { responseType: 'text' });
  }

  setList(listaNueva: Usuario[]) {
    this.listaCambio.next(listaNueva)
  }

  getList() {
    return this.listaCambio.asObservable()
  }
  
  listId(id: number) {
    return this.http.get<Usuario>(`${this.url}/${id}`)
  }
  
  update(u: Usuario) {
    return this.http.put(this.url, u)
  }

  eliminar(id:number) {
    return this.http.delete(`${this.url}/${id}`)
  }

  buscarPlaca(pl:string){
    const params = { placa: pl };
    return this.http.get<Usuario[]>(`${this.url}/${pl}`, { params });

  }


}
