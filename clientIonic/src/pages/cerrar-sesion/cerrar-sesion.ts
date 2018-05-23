import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { LoginPage } from '../login/login';

/**
 * Generated class for the CerrarSesionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cerrar-sesion',
  templateUrl: 'cerrar-sesion.html',
})
export class CerrarSesionPage {

  nombre;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.nombre =navParams.get('nombre');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  cerrarSesion(){
    localStorage.removeItem('identidadAlumno');
    localStorage.removeItem('identidadProfesor');
    localStorage.clear();
    this.navCtrl.push(LoginPage);
  }

}
