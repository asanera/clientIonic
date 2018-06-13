import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Asignacion } from '../../models/asignacion';
import { HomePage } from '../home/home';
import { Clase } from '../../models/clase';
import { AsignacionService } from '../../providers/servicios/asignacion.service';

/**
 * Generated class for the AsignacionesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-asignaciones',
  templateUrl: 'asignaciones.html',
  providers: [AsignacionService]
})
export class AsignacionesPage {

  asignaciones: Asignacion[];
  clase: Clase;
  id: Number;
  verActualizacion: Boolean;
  
  constructor(public toastCtrl: ToastController,public asignacionService: AsignacionService,public navCtrl: NavController, public navParams: NavParams) {
    this.clase = navParams.get('clase');
    this.verActualizacion = this.navParams.get('verActualizacion');
    this.asignaciones = this.clase.asignaciones;     
  }
  volver() {
    this.navCtrl.push(HomePage);
  }
  actualizar(){
    this.asignacionService.actualizarAsignacionesAleatorias(this.clase.id).subscribe(
      response => {
        this.clase.asignaciones = response;
        this.navCtrl.push(AsignacionesPage, {clase: this.clase});
      }, error => {
        console.log(error);
        let capturaError = <any>error;
        let errorCodigo;
        let body;
        if (capturaError != null) {
          body = JSON.parse(error._body);
          errorCodigo = body.codigo;
          if (errorCodigo == 1100)
            this.lanzarToach(body.error);
          else
            this.lanzarToach("Ha ocurrido un error en las asignaciones.");
        }
      }
    );
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
