import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { Alumno } from '../../models/alumno';
import { Profesor } from '../../models/profesor';
import { AlumnoService } from '../../providers/servicios/alumno.service';
import { ProfesorService } from '../../providers/servicios/profesor.service';
import { LoginPage } from '../login/login';

/**
 * Generated class for the AjustesBorrarPerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-ajustes-borrar-perfil',
  templateUrl: 'ajustes-borrar-perfil.html',
  providers: [ProfesorService, AlumnoService]
})
export class AjustesBorrarPerfilPage {
  alumno: Alumno;
  profesor: Profesor;
  nombre: String;
  constructor(public toastCtrl: ToastController, public alumnoService: AlumnoService, public profesorService: ProfesorService, public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
    this.alumno = this.navParams.get('alumno');
    this.profesor = this.navParams.get('profesor');
    if (this.alumno)
      this.nombre = this.alumno.nombre;
    else
      this.nombre = this.profesor.nombre;
  }
  borrar() {
    if (this.alumno)
      this.borrarAlumno();
    else
      this.borrarProfesor();
  }
  borrarAlumno() {
    this.alumnoService.borrar(this.alumno.id).subscribe(response => {
      if (response) {
        this.cerrarSesion();
      }
      else {
        this.lanzarToach("No se ha podido borrar su cuenta");
      }
    }, error => {
      var capturaError = <any>error;
      var errorCodigo;
      if (capturaError != null) {
        var body = JSON.parse(error._body);
        errorCodigo = body.codigo;
        if (errorCodigo == 1100)
          this.lanzarToach(body.error);
        else
          this.lanzarToach("Ha ocurrido un error inesperado intentelo mas tarde");
      }
    });
  }
  borrarProfesor() {
     this.profesorService.borrar(this.profesor.id).subscribe(response => {
      if (response) {
        this.cerrarSesion();
      }
      else {
        this.lanzarToach("No se ha podido borrar su cuenta");
      }
    }, error => {
      var capturaError = <any>error;
      var errorCodigo;
      if (capturaError != null) {
        var body = JSON.parse(error._body);
        errorCodigo = body.codigo;
        if (errorCodigo == 1100)
          this.lanzarToach(body.error);
        else
          this.lanzarToach("Ha ocurrido un error inesperado intentelo mas tarde");
      }
    });
  }
  lanzarToach(mensaje) {
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 3000,
      dismissOnPageChange: true
    });
    toast.present();
  }
  cerrarSesion() {
    localStorage.removeItem('identidadAlumno');
    localStorage.removeItem('identidadProfesor');
    localStorage.clear();
    this.navCtrl.push(LoginPage);
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
}