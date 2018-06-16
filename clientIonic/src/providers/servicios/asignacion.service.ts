import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';


// librería sirve para mapear objetos
import 'rxjs/add/operator/map';

// sirve para recoger las respuestas de las peticiones ajax al servidor
import { Clase } from '../../models/clase';


/*
  Generated class for the ServiciosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AsignacionService{
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

  generarAsignacionesAleatorias(clase: Clase){
     //Peticion al backen
     return this.http.post(this.url + 'asignacion/random',clase,
     this.options).map(res => res.json());
  }
  actualizarAsignacionesAleatorias(id: Number)  {
     //Peticion al backend
     return this.http.post(this.url + 'asignacion/update/'+id,null,
     this.options).map(res => res.json());
  }
  eliminarAsignacion(idClase: Number, idAlumno: Number) {
    //Peticion al backend
    return this.http.get(this.url + 'asignacion/baja/clase/'+idClase+'/alumno/'+idAlumno,
    this.options).map(res => res.json());
  }
 
  
}
