import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Alumno } from '../../models/alumno';
import { Profesor } from '../../models/profesor';
import { AuthService } from '../../providers/servicios/auth.service';
import { Clase } from '../../models/clase';

/**
 * Generated class for the ClaseDetallePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-clase-detalle',
  templateUrl: 'clase-detalle.html',
  providers: [AuthService]
})
export class ClaseDetallePage {
  public identidadAlumno: Alumno;
  public identidadProfesor: Profesor;
  public clase: Clase;
  
  constructor(public viewCtrl: ViewController,public navParams: NavParams,public navCtrl: NavController, private authService: AuthService) {
    this.identidadAlumno = authService.getAlumno();
    this.identidadProfesor = authService.getProfesor();
    this.clase =navParams.get('clase');
    (this.clase);
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }

}
