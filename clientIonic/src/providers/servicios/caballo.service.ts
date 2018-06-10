import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';


// librería sirve para mapear objetos
import 'rxjs/add/operator/map';

// sirve para recoger las respuestas de las peticiones ajax al servidor
import { Observable } from 'rxjs/Observable';
import { Alumno } from '../../models/alumno';
import { Grupo } from '../../models/grupo';
import { Caballo } from '../../models/caballo';

/*
  Generated class for the ServiciosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CaballoService{
 
  private url = "http://localhost:8080/api/";
  private headers;
  private options;
  constructor(public http: Http) {
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Authorization': 'Basic dXNlcjpwcm9fR2FjZTIwMTg=',
    })
    this.options = new RequestOptions({ headers: this.headers });
  }
  actualizar(caballo: Caballo, nombre: String) {
    //Peticion al backen
    return this.http.post(this.url + 'caballo/actualizar/'+nombre, caballo,
      this.options).map(res => res.json());
  }
  obtenerCaballos() {
    //Peticion al backen
    return this.http.get(this.url + 'caballos',
      this.options).map(res => res.json());
  }
  borrar(caballo: Caballo) {
    //Peticion al backen
    return this.http.post(this.url + 'caballo/borrar',caballo,
      this.options).map(res => res.json());
  }
  anadir(caballo: Caballo) {
    //Peticion al backen
    return this.http.post(this.url + 'caballo',caballo,
      this.options).map(res => res.json());
  }

 
  
}
