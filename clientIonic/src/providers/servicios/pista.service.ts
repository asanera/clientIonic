import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';


// librería sirve para mapear objetos
import 'rxjs/add/operator/map';

// sirve para recoger las respuestas de las peticiones ajax al servidor
import { Observable } from 'rxjs/Observable';
import { Alumno } from '../../models/alumno';
import { Grupo } from '../../models/grupo';
import { Pista } from '../../models/pista';

@Injectable()
export class PistaService{
 
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
  obtenerPistas() {
    //Peticion al backen
    return this.http.get(this.url + 'pistas',
      this.options).map(res => res.json());
  }
  anadirActualiza(pista: Pista) {
    //Peticion al backen
    return this.http.post(this.url + 'pista', pista,
      this.options).map(res => res.json());
  }
  borrar(pista: Pista){
    //Peticion al backen
    return this.http.post(this.url + 'pista/borrar', pista,
      this.options).map(res => res.json());
  }
  obtenerPistaId(id: Number) {
    //Peticion al backen
    return this.http.get(this.url + 'pista/{id}',
      this.options).map(res => res.json());
  }
  }
  

