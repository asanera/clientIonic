import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Alumno } from '../../models/alumno';
import { Profesor } from '../../models/profesor';
import { AuthService } from '../../providers/servicios/auth.service';

/**
 * Generated class for the InicioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inicio',
  templateUrl: 'inicio.html',
  providers: [AuthService]
})
export class InicioPage {

  public identidadAlumno: Alumno;
  public identidadProfesor: Profesor;
  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthService) {
    this.identidadAlumno = authService.identidadAlumno();
    this.identidadProfesor = authService.identidadProfesor();
  }

  ionViewDidLoad() {
    ('ionViewDidLoad InicioPage');
  }

}
