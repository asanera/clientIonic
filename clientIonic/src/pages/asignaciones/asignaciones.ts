import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Asignacion } from '../../models/asignacion';
import { HomePage } from '../home/home';

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
})
export class AsignacionesPage {

  asignaciones: Asignacion[];
  actualizar: Boolean = false;
  id: Number;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.asignaciones = navParams.get("asignaciones");     
  }
  volver() {
    this.navCtrl.push(HomePage);
  }


}
