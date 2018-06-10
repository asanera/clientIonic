import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AdminGrupoPage } from '../admin-grupo/admin-grupo';
import { AdminAlumnoPage } from '../admin-alumno/admin-alumno';
import { AdminProfesorPage } from '../admin-profesor/admin-profesor';
import { AdminPistaPage } from '../admin-pista/admin-pista';
import { Alumno } from '../../models/alumno';
import { AdminCaballoPage } from '../admin-caballo/admin-caballo';

/**
 * Generated class for the AdminPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage {


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  alumnos(){
    this.navCtrl.push(AdminAlumnoPage);
  }
  grupos(){
    this.navCtrl.push(AdminGrupoPage);
  }
  profesores(){
    this.navCtrl.push(AdminProfesorPage);
  }
  pistas(){
    this.navCtrl.push(AdminPistaPage);
  }
  caballos(){
    this.navCtrl.push(AdminCaballoPage);
  }
}
