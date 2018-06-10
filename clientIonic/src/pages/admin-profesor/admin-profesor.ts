import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Profesor } from '../../models/profesor';
import { ProfesorService } from '../../providers/servicios/profesor.service';
import { ProfesorDetallePage } from '../profesor-detalle/profesor-detalle';

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
  detalleProfesor(profesor: Profesor){
    this.navCtrl.push(ProfesorDetallePage, {profesor: profesor});
  }
  lanzarToach(mensaje) {
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 3000,
      dismissOnPageChange: true
    });
    toast.present();
  }
  getItems(ev) {
    // Reset items back to all of the items
    var val = ev.target.value;
    if (val == undefined || val == '') {
      this.obtenerProfesores();
      return;
    }
    // set val to the value of the ev target

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.profesores = this.profesores.filter((item) => {
        return (item.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

}
