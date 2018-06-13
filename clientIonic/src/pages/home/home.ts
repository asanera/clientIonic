import { Component } from '@angular/core';
import { NavController, ModalController, ToastController, NavParams } from 'ionic-angular';
import { Clase } from '../../models/clase';
import { Profesor } from '../../models/profesor';
import { Alumno } from '../../models/alumno';
import { AuthService } from '../../providers/servicios/auth.service';
import { ClaseService } from '../../providers/servicios/clases.service';
import { ClaseDetallePage } from '../clase-detalle/clase-detalle';
import { LoginPage } from '../login/login';
import { ClasesAnadirPage } from '../clases-anadir/clases-anadir';
import { Grupo } from '../../models/grupo';
import { Caballo } from '../../models/caballo';
import { Asignacion } from '../../models/asignacion';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [AuthService, ClaseService]
})
export class HomePage {

  identidadAlumno: Alumno;
  identidadProfesor: Profesor;
  clases: Clase[];
  clasesPasadas: Clase[];
  clasesProfesor: Array<any> = [];
  clasesProfesorAntiguas: Array<any> = [];
  clasesAlumno: Array<any> = [];
  clasesAlumnosPasadas: Array<any> = [];
  segment;
  mensaje: String;

  constructor(public toastCtrl: ToastController, public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams,private authService: AuthService, private claseService: ClaseService) {
    this.identidadAlumno = authService.getAlumno();
    this.identidadProfesor = authService.getProfesor();
    this.segment = "proximas";
  }
  ionViewWillEnter() {
    this.controlador()
  }
  ionViewDidEnter(){
    this.mensaje = null;
    this.mensaje = this.navParams.get("mensaje");
    if(this.mensaje !=null){
      this.lanzarToach(this.mensaje);
    }
  }
  controlador() {
    if (this.identidadAlumno) {
      this.obtenerClasesFuturasPorAlumno(this.identidadAlumno.id);
      this.obtenerClasesPasadasPorAlumno(this.identidadAlumno.id);
    }
    else if (this.identidadProfesor) {
      this.obtenerClasesFuturasPorProfesor(this.identidadProfesor.id);
      this.obtenerClasesPasadasPorProfesor(this.identidadProfesor.id);
    } else {
      this.navCtrl.push(LoginPage);
    }
  }

  obtenerClasesFuturasPorProfesor(idProfesor: number) {
    this.claseService.obtenerFuturasClasesPorProfesor(idProfesor).subscribe(
      response => {
        this.clases = response;
        this.clasesProfesor = this.obtenerClasesProfesor(this.clases);
      }, error => {
        let capturaError = <any>error;
        let errorCodigo;
        let body;
        if (capturaError != null) {
          body = JSON.parse(error._body);
          errorCodigo = body.codigo;
          if (errorCodigo == 1100)
            this.lanzarToach(body.error);
          else
            this.lanzarToach("Ha ocurrido un error inesperado intentelo mas tarde");
          return;
        }
      }
    );
  }

  obtenerClasesPasadasPorProfesor(idProfesor: number) {
    this.claseService.obtenerClasesPasadasPorProfesor(idProfesor).subscribe(
      response => {
        this.clasesPasadas = response;
        this.clasesProfesorAntiguas = this.obtenerClasesProfesorAntiguas(this.clasesPasadas);
      }, error => {
        let capturaError = <any>error;
        let errorCodigo;
        let body;
        if (capturaError != null) {
          body = JSON.parse(error._body);
          errorCodigo = body.codigo;
          if (errorCodigo == 1100)
            this.lanzarToach(body.error);
          else
            this.lanzarToach("Ha ocurrido un error inesperado intentelo mas tarde");
          return;
        }
      }
    );
  }


  obtenerClasesProfesor(clases: Clase[]) {
    let clasesProfesor: Array<any> = [];
    let id, nombre, especialidad, pista, grupo, asignaciones: Asignacion[], fecha;
    let clase: Clase;
    for (clase of clases) {
      id = clase.id
      nombre = clase.nombre;
      especialidad = clase.especialidad;
      pista = clase.pista.nombre;
      fecha= this.formatearFecha(clase.fecha.toString());
      if (clase.asignaciones.length != 0) {
        asignaciones = clase.asignaciones;
        grupo = clase.asignaciones[0].alumno.grupo;
      }
      else
        grupo = new Grupo(-1, "Actualmente no hay asignaciones", null);
      clasesProfesor.push({
        id: id,
        nombre: nombre,
        especialidad: especialidad,
        pista: pista,
        fecha: fecha,
        grupo: grupo,
        asignaciones: asignaciones
      });
    }
    return clasesProfesor;
  }

  obtenerClasesProfesorAntiguas(clasesPasadas: Clase[]) {
    let clasesProfesorAntiguas: Array<any> = [];
    let id, nombre, especialidad, pista, grupo, asignaciones: Asignacion[], fecha;
    let clase: Clase;
    for (clase of clasesPasadas) {
      id = clase.id;
      nombre = clase.nombre;
      especialidad = clase.especialidad;
      pista = clase.pista.nombre;
      fecha = this.formatearFecha(clase.fecha.toString());
      if (clase.asignaciones.length != 0) {
        asignaciones = clase.asignaciones;
        grupo = clase.asignaciones[0].alumno.grupo;   
      }
      else {
        grupo = new Grupo(-1, "Actualmente no hay asignaciones", null);
      }
      clasesProfesorAntiguas.push({
        id: id,
        nombre: nombre,
        especialidad: especialidad,
        pista: pista,
        fecha: fecha,
        grupo: grupo,
        asignaciones: asignaciones
      });
    }
    return clasesProfesorAntiguas;
  }

  obtenerClasesFuturasPorAlumno(idAlumno: number) {
    this.claseService.obtenerFuturasClasesPorAlumno(idAlumno).subscribe(
      response => {
        this.clases = response;
        this.clasesAlumno = this.obtenerClasesAlumno(this.clases);
      }, error => {
        let capturaError = <any>error;
        let errorCodigo;
        let body;
        if (capturaError != null) {
          body = JSON.parse(error._body);
          errorCodigo = body.codigo;
          if (errorCodigo == 1100)
            this.lanzarToach(body.error);
          else
            this.lanzarToach("Ha ocurrido un error inesperado intentelo mas tarde");
          return;
        }
      }
    );

  }
  obtenerClasesPasadasPorAlumno(idAlumno: number) {
    this.claseService.obtenerPasadasClasesPorAlumno(idAlumno).subscribe(
      response => {
        this.clases = response;
        this.clasesAlumnosPasadas = this.setearClasesPasadasAlumno(this.clases);
      }, error => {
        let capturaError = <any>error;
        let errorCodigo;
        let body;
        if (capturaError != null) {
          body = JSON.parse(error._body);
          errorCodigo = body.codigo;
          if (errorCodigo == 1100)
            this.lanzarToach(body.error);
          else
            this.lanzarToach("Ha ocurrido un error inesperado intentelo mas tarde");
          return;
        }
      }
    );
  }
  setearClasesPasadasAlumno(clases: Clase[]) {
    let clasesAlumnoPasada: Array<any> = [];
    let nombre, especialidad, caballo, pista, profesor, fecha;

    for (let clase of clases) {
      nombre = clase.nombre;
      especialidad = clase.especialidad;
      pista = clase.pista.nombre;
      fecha = this.formatearFecha(clase.fecha.toString());
      profesor = clase.profesor.nombre;
      for (let asignacion of clase.asignaciones) {
        if (asignacion.alumno.id == this.identidadAlumno.id) {
          if (asignacion.caballo == null) {
            let caballoFicticio: Caballo = new Caballo(-1, "Ningun caballo asociado", "", new Date(), null)
            caballo = caballoFicticio.nombre;
          }
          else
            caballo = asignacion.caballo.nombre;
          break;
        }
      }
      clasesAlumnoPasada.push({
        nombre: nombre,
        especialidad: especialidad,
        pista: pista,
        fecha: fecha,
        caballo: caballo,
        profesor: profesor
      });
    }
    return clasesAlumnoPasada;
  }
  formatearFecha(fecha: string){
    let date: Date = new Date(fecha);
    let fechaNueva: String;
    if( date.getMinutes() == 0){
      fechaNueva = date.getUTCDate() + "/"+(date.getMonth()+1)+"/"+date.getFullYear() + " " + date.getHours() +":"+ date.getMinutes()+'0';
    }else{
      fechaNueva = date.getUTCDate() + "/"+(date.getMonth()+1)+"/"+date.getFullYear() + " " + date.getHours() +":"+ date.getMinutes();
    }
    return fechaNueva;
  }
  obtenerClasesAlumno(clases: Clase[]) {
    let clasesAlumno: Array<any> = [];
    let nombre, especialidad, caballo, pista, profesor, fecha;
    for (let clase of clases) {
      nombre = clase.nombre;
      especialidad = clase.especialidad;
      pista = clase.pista.nombre;
      fecha = this.formatearFecha(clase.fecha.toString());
      profesor = clase.profesor.nombre;
      for (let asignacion of clase.asignaciones) {
        if (asignacion.alumno.id == this.identidadAlumno.id) {
          if (asignacion.caballo == null) {
            let caballoFicticio: Caballo = new Caballo(-1, "Ningun caballo asociado", "", new Date(), null)
            caballo = caballoFicticio.nombre;
          }
          else
            caballo = asignacion.caballo.nombre;
          break;
        }
      }
      clasesAlumno.push({
        nombre: nombre,
        especialidad: especialidad,
        pista: pista,
        fecha: fecha,
        caballo: caballo,
        profesor: profesor
      });
    }
    return clasesAlumno;
  }

  detalleClase(clase, verActualizacion:Boolean) {
    this.navCtrl.push(ClaseDetallePage, { clase: clase, verActualizacion: verActualizacion });
  }
  anadir() {
    this.navCtrl.push(ClasesAnadirPage, { nuevo: true });
  }
  getItems(ev) {
    // set val to the value of the ev target
    var val = ev.target.value;
    if (val == undefined || val == '') {
      this.controlador();
      return;
    }
    // if the value is an empty string don't filter the items
    if (this.identidadAlumno) {
      if (this.segment == 'proximas') {
        if (val && val.trim() != '') {
          this.clasesAlumno = this.clasesAlumno.filter((item) => {
            return (item.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
          })
        }
      } else {
        if (val && val.trim() != '') {
          this.clasesAlumnosPasadas = this.clasesAlumnosPasadas.filter((item) => {
            return (item.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
          })
        }
      }
    } else {
      if (this.segment == 'proximas') {
        if (val && val.trim() != '') {
          this.clasesProfesor = this.clasesProfesor.filter((item) => {
            return (item.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
          });
        }
      } else {
        if (val && val.trim() != '') {
          this.clasesProfesorAntiguas = this.clasesProfesorAntiguas.filter((item) => {
            return (item.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
          });
        }
      }
    }
  }
  lanzarToach(mensaje) {
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 3000,
      dismissOnPageChange: true
    });
    toast.present();
  }
  eliminarClase(clase: Clase){
   this.navCtrl.push(ClaseDetallePage, { clase: clase, eliminar:true });
  }
}