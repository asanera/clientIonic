import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { Alumno } from '../../models/alumno';
import { Profesor } from '../../models/profesor';
import { AuthService } from '../../providers/servicios/auth.service';
import { Clase } from '../../models/clase';
import { AsignacionesPage } from '../asignaciones/asignaciones';
import { ElementSchemaRegistry } from '@angular/compiler';
import { ClaseService } from '../../providers/servicios/clases.service';
import { HomePage } from '../home/home';

/**
 * Generated class for the ClaseDetallePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-clase-detalle',
  templateUrl: 'clase-detalle.html',
  providers: [AuthService, ClaseService]
})
export class ClaseDetallePage {
  identidadAlumno: Alumno;
  identidadProfesor: Profesor;
  clase: Clase;
  eliminar: Boolean
  verActualizacion: Boolean;
  constructor(public claseService: ClaseService, public toastCtrl: ToastController, public viewCtrl: ViewController, public navParams: NavParams, public navCtrl: NavController, private authService: AuthService) {
    this.identidadAlumno = authService.getAlumno();
    this.identidadProfesor = authService.getProfesor();
    this.clase = navParams.get('clase');
    this.verActualizacion = navParams.get('verActualizacion');
    if (this.navParams.get('eliminar'))
      this.eliminar = true;
    else
      this.eliminar = false;
  }
  verAsignaciones() {
    this.navCtrl.push(AsignacionesPage, { clase: this.clase, verActualizacion: this.verActualizacion});
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  lanzarToach(mensaje) {
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 3000,
      dismissOnPageChange: true
    });
    toast.present();
  }
  borrarClase() {
    this.claseService.borrarClase(this.clase.id).subscribe(
      response => {
        let correcto: Boolean = response;
        if (correcto){
          this.dismiss();
          this.navCtrl.push(HomePage, {mensaje: 'La clase '+this.clase.nombre +' se ha borrado correctamente'});
        }else{
          this.lanzarToach('La clase no se ha eliminado correctamente');
        }
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
        }
      }
    );
  }

}
