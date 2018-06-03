import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Profesor } from '../../models/profesor';
import { ProfesorService } from '../../providers/servicios/profesor.service';

/**
 * Generated class for the AdminProfesorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-profesor',
  templateUrl: 'admin-profesor.html',
  providers: [ProfesorService]
})
export class AdminProfesorPage {

  profesores: Profesor[];
  constructor(public toastCtrl: ToastController,public profesorService: ProfesorService, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillEnter() {
    this.obtenerProfesores();
  }
  obtenerProfesores() {
    this.profesorService.obtenerProfesores().subscribe(
      response => {
        this.profesores = response;
        console.log(response);
      }, error => {
        let capturaError = <any>error;
        let errorCodigo;
        let body;
        if (capturaError != null) {
          body = JSON.parse(error._body);
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
