import { Component, OnInit } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { Alumno } from '../../models/alumno';
import { Profesor } from '../../models/profesor';
import { AuthService } from '../../providers/servicios/auth.service';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AjustesPage } from '../ajustes/ajustes';
import { AdminPage } from '../admin/admin';

@Component({
  templateUrl: 'tabs.html',
  providers: [AuthService]
})
export class TabsPage {

  tab1Root = HomePage;
  tab3Root = ContactPage;
  tab4Root = AjustesPage;
  tab5Root = AdminPage;
  public identidadAlumno: Alumno;
  public identidadProfesor: Profesor;
  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthService) {
    this.identidadAlumno = authService.getAlumno();
    this.identidadProfesor = authService.getProfesor();
  }

  ionViewDidEnter(){
    if(this.identidadAlumno == null && this.identidadProfesor == null){
      this.navCtrl.push(LoginPage);
    }
  }
}
