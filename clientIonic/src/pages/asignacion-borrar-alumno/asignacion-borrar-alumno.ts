import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { AsignacionService } from '../../providers/servicios/asignacion.service';
import { HomePage } from '../home/home';

/**
 * Generated class for the AsignacionBorrarAlumnoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-asignacion-borrar-alumno',
  templateUrl: 'asignacion-borrar-alumno.html',
  providers: [AsignacionService]
})
export class AsignacionBorrarAlumnoPage {
  idClase: Number;
  idAlumno: Number;
  constructor(public asignacionService: AsignacionService, public viewCtrl: ViewController,public toastCtrl: ToastController,public navCtrl: NavController, public navParams: NavParams) {
    this.idClase = this.navParams.get('idClase');
    this.idAlumno = this.navParams.get('idAlumno');
  }
  borrar(){
    this.asignacionService.eliminarAsignacion(this.idClase,this.idAlumno).subscribe(response => {
        this.navCtrl.push(HomePage,{mensaje:'Se ha dado de baja de la clase correctamente'});
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
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
