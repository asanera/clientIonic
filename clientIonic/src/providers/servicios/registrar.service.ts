import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';


// librería sirve para mapear objetos
import 'rxjs/add/operator/map';

// sirve para recoger las respuestas de las peticiones ajax al servidor
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the ServiciosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RegistrarService{

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

  registrarAlumno(alumno) {
     //Peticion al backend
     return this.http.post(this.url + 'alumno/registrar', JSON.stringify(alumno),
     this.options).map(res => res.json());
  }
  registrarProfesor(profesor) {
     //Peticion al backend
     return this.http.post(this.url + 'profesor/registrar', JSON.stringify(profesor),
     this.options).map(res => res.json());
  }
  
}
