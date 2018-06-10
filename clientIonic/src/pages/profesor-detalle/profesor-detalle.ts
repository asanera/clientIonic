import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Profesor } from '../../models/profesor';

/**
 * Generated class for the ProfesorDetallePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profesor-detalle',
  templateUrl: 'profesor-detalle.html',
})
export class ProfesorDetallePage {

  profesor: Profesor;
  constructor(public viewCtrl: ViewController,public navCtrl: NavController, public navParams: NavParams) {
    this.profesor = navParams.get("profesor");
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  

}
