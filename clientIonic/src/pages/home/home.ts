import { Component } from '@angular/core';
import { NavController, ModalController, ToastController } from 'ionic-angular';
import { Clase } from '../../models/clase';
import { Profesor } from '../../models/profesor';
import { Alumno } from '../../models/alumno';
import { AuthService } from '../../providers/servicios/auth.service';
import { ClaseService } from '../../providers/servicios/clases.service';
import { ClaseDetallePage } from '../clase-detalle/clase-detalle';
import { LoginPage } from '../login/login';
import { ClasesAnadirPage } from '../clases-anadir/clases-anadir';
import { Grupo } from '../../models/grupo';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [AuthService, ClaseService]
})
export class HomePage {

  public identidadAlumno: Alumno;
  public identidadProfesor: Profesor;
  public clases: Clase[];
  public clasesPasadas: Clase[];
  public clasesAlumno: Array<any> = [];
  public clasesProfesor: Array<any> = [];
  public clasesProfesorAntiguas: Array<any> = [];

  public segment;


  constructor(public toastCtrl: ToastController,public modalCtrl: ModalController, public navCtrl: NavController, private authService: AuthService, private claseService: ClaseService) {
    this.identidadAlumno = authService.getAlumno();
    this.identidadProfesor = authService.getProfesor();
    this.segment = "proximas";
  }
  ngOnInit() {
    if (this.identidadAlumno) {
      this.obtenerClasesFuturasPorAlumno(this.identidadAlumno.id);
    }
    else if (this.identidadProfesor) {
      this.obtenerClasesFuturasPorProfesor(this.identidadProfesor.id);
      this.obtenerClasesPasadasPorProfesor(this.identidadProfesor.id);
    } else {
      this.navCtrl.push(LoginPage);
    }
  }
  obtenerClasesFuturasPorAlumno(idAlumno: number) {
    this.claseService.obtenerFuturasClasesPorAlumno(idAlumno).subscribe(
      response => {
        this.clases = response;
      }, error => {
        var errorMessage = <any>error;
        if (errorMessage != null) {
          var body = JSON.parse(error._body);
          return;
        }
      }, () => {
        if (!this.clases) {
          this.lanzarToach("Actualmente no tienes ninguna clase")
        } else {
          this.clasesAlumno = this.obtenerClasesAlumno(this.clases);
        }
      }
    );

  }
  obtenerClasesFuturasPorProfesor(idProfesor: number) {
    this.claseService.obtenerFuturasClasesPorProfesor(idProfesor).subscribe(
      response => {
        this.clases = response;
        console.log(this.clases);
      }, error => {
        var errorMessage = <any>error;
        if (errorMessage != null) {
          var body = JSON.parse(error._body);
          return;
        }
      }, () => {
        if (!this.clases) {
            this.lanzarToach("Actualmente no has creado ninguna clase")
        } else {
          this.clasesProfesor = this.obtenerClasesProfesor(this.clases);
        }
      }
    );
  }

  obtenerClasesPasadasPorProfesor(idProfesor: number) {
    this.claseService.obtenerClasesPasadasPorProfesor(idProfesor).subscribe(
      response => {
        this.clasesPasadas = response;
        console.log(this.clasesPasadas);
      }, error => {
        var errorMessage = <any>error;
        if (errorMessage != null) {
          var body = JSON.parse(error._body);
          return;
        }
      }, () => {
        this.clasesProfesor = this.obtenerClasesProfesorAntiguas(this.clasesPasadas);
      }
    );
  }


  private obtenerClasesProfesor(clases: Clase[]) {
    let clasesProfesor: Array<any> = [];
    let nombre, especialidad, pista, grupo;
    let fecha: Date;
    let clase: Clase;
    for (clase of clases) {
      nombre = clase.nombre;
      especialidad = clase.especialidad;
      pista = clase.pista.nombre;
      fecha =clase.fecha
      if (clase.asignaciones.length != 0)
        grupo = clase.asignaciones[0].alumno.grupo.nombre;
      else
       grupo = new Grupo(-1, "Actualmente no hay asignaciones", null);
      clasesProfesor.push({
        nombre: nombre,
        especialidad: especialidad,
        pista: pista,
        fecha: fecha,
        grupo: grupo
      });
    }
    return clasesProfesor;
  }

  private obtenerClasesProfesorAntiguas(clases: Clase[]) {
    let clasesProfesorAntiguas: Array<any> = [];
    let nombre, especialidad, pista, grupo;
    let fecha: Date;
    let clase: Clase;
    for (clase of clases) {
      nombre = clase.nombre;
      especialidad = clase.especialidad;
      pista = clase.pista.nombre;
      fecha =clase.fecha
      if (clase.asignaciones.length != 0)
        grupo = clase.asignaciones[0].alumno.grupo.nombre;
      else
      grupo = new Grupo(-1, "Actualmente no hay asignaciones", null);
      this.clasesProfesorAntiguas.push({
        nombre: nombre,
        especialidad: especialidad,
        pista: pista,
        fecha: fecha,
        grupo: grupo
      });
    }
    return clasesProfesorAntiguas;
  }


  
  private obtenerClasesAlumno(clases: Clase[]) {
    let clasesAlumno: Array<any> = [];
    let nombre, especialidad, caballo, pista, profesor;
    let fecha: Date;
    for (let clase of clases) {
      nombre = clase.nombre;
      especialidad = clase.especialidad;
      pista = clase.pista.nombre;
      fecha = clase.fecha;
      profesor = clase.profesor.nombre;
      for (let asignacion of clase.asignaciones) {
        if (asignacion.alumno.id == this.identidadAlumno.id) {
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

  detalleClase(clase) {
    let modal = this.modalCtrl.create(ClaseDetallePage, { clase: clase });
    modal.present();
  }


  getItems(ev) {
    // set val to the value of the ev target
    var val = ev.target.value;
    if (val == undefined || val == '') {
      this.ngOnInit();
      return;
    }
    // if the value is an empty string don't filter the items
    if (this.identidadAlumno) {
      if (val && val.trim() != '') {
        this.clasesAlumno = this.clasesAlumno.filter((item) => {
          return (item.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
    } else {
      if (val && val.trim() != '') {
        this.clasesProfesor = this.clasesProfesor.filter((item) => {
          (item);
          return (item.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
    }

  }
  anadir() {
    this.navCtrl.push(ClasesAnadirPage, { nuevo: true });
  }
  lanzarToach(mensaje) {
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 3000,
      dismissOnPageChange: true
    });
    toast.present();
  }
}
