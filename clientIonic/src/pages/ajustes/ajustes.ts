import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Alumno } from '../../models/alumno';
import { Profesor } from '../../models/profesor';
import { AuthService } from '../../providers/servicios/auth.service';
import { CerrarSesionPage } from '../cerrar-sesion/cerrar-sesion';
import { ActualizarPerfilPage } from '../actualizar-perfil/actualizar-perfil';

/**
 * Generated class for the AjustesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ajustes',
  templateUrl: 'ajustes.html',
  providers: [AuthService]
})
export class AjustesPage {
  public identidadAlumno: Alumno;
  public identidadProfesor: Profesor;
  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthService, public modalCtrl: ModalController) {
    this.identidadAlumno = authService.getAlumno();
    this.identidadProfesor = authService.getProfesor();
  }

  cerrarSesion() {
    let profileModal;
    if (this.identidadAlumno)
      profileModal = this.modalCtrl.create(CerrarSesionPage, { nombre: this.identidadAlumno.nombre });
    else
      profileModal = this.modalCtrl.create(CerrarSesionPage, { nombre: this.identidadProfesor.nombre });
    profileModal.present();
  }
  editar() {
    this.navCtrl.push(ActualizarPerfilPage);
  }
  borrar() {

  }

}
