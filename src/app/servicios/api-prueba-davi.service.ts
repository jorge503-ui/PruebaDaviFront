import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../modelos/cliente.model';
import { Solicitud } from '../modelos/solicitud.model';
import { Catalogo } from '../modelos/catalogo.model';

@Injectable({
  providedIn: 'root'
})
export class ApiPruebaDaviService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  consultarInfoPersona(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/consultarInfoPersona?id=${id}`);
  }

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.apiUrl}/getClientes`);
  }

  getCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/getCliente/${id}`);
  }

  postCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.apiUrl}/postCliente`, cliente);
  }

  getSolicitudesByPerson(id: number): Observable<Solicitud[]> {
    return this.http.get<Solicitud[]>(`${this.apiUrl}/getSolicitudesByPerson/${id}`);
  }

  postSolicitud(solicitud: Solicitud): Observable<Solicitud> {
    return this.http.post<Solicitud>(`${this.apiUrl}/postSolicitud`, solicitud);
  }

  getActividadesEconomicas(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(`${this.apiUrl}/getActividadesEconomicas`);
  }

  getEstadosCiviles(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(`${this.apiUrl}/getEstadosCiviles`);
  }

  getFormasDePago(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(`${this.apiUrl}/getFormasDePago`);
  }
}
