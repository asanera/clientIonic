import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';


// librería sirve para mapear objetos
import 'rxjs/add/operator/map';

// sirve para recoger las respuestas de las peticiones ajax al servidor
import { Observable } from 'rxjs/Observable';
import { Grupo } from '../../models/grupo';

/*
  Generated class for the ServiciosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GrupoService{

  
  
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
  obtenerGrupoById(id) {
    //Peticion al backen
    return this.http.get(this.url + 'grupo/'+id,this.options).map(res => res.json());

  }
  obtenerGrupos(){
    //Peticion al backen
    return this.http.get(this.url + 'grupos',
      this.options).map(res => res.json());
  }
  borrarGrupo(grupo: Grupo){
    //Peticion al backen
    return this.http.post(this.url + 'grupo/delete',grupo,
      this.options).map(res => res.json());
  }  
}
