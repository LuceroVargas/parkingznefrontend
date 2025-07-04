import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Empresa } from '../models/empresa';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EmpresamasReservadaDTO } from '../models/empresamasreservadaDTO';
const base_url = environment.base

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {


  private listaCambio = new Subject<Empresa[]>()
  private url = `${base_url}/empresas`

  constructor(private http: HttpClient) { }
   list() {
      return this.http.get<Empresa[]>(this.url)
    }
  
    insert(e: Empresa) {
      return this.http.post(this.url, e)
    }
    getList() {
      return this.listaCambio.asObservable()
    }
    setList(listaNueva: Empresa[]) {
      this.listaCambio.next(listaNueva)
    }
  
    listId(id: number) {
      return this.http.get<Empresa>(`${this.url}/${id}`)
    }
  
    update(e: Empresa) {
        return this.http.put(this.url, e)
    }
    
    deleteS(id:number) {
      return this.http.delete(`${this.url}/${id}`)
    }

     getempresamasreservada():Observable<EmpresamasReservadaDTO[]>{
      return this.http.get<EmpresamasReservadaDTO[]>(`${this.url}/mayorreserva`)
}

}
