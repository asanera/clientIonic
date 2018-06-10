import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { Caballo } from '../../models/caballo';
import { CaballoService } from '../../providers/servicios/caballo.service';
import { AdminCaballoPage } from '../admin-caballo/admin-caballo';

/**
 * Generated class for the ModalCaballoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-caballo',
  templateUrl: 'modal-caballo.html',
  providers: [CaballoService]
})
export class ModalCaballoPage {

  caballo: Caballo;
  constructor(public viewCtrl: ViewController,public toastCtrl: ToastController,public caballoService: CaballoService,public navCtrl: NavController, public navParams: NavParams) {
    this.caballo = this.navParams.get("caballo");
  }

  borrar(){
    this.caballoService.borrar(this.caballo).subscribe(
      response => {
        this.navCtrl.push(AdminCaballoPage,{mensaje:"El caballo "+ this.caballo.nombre+" se ha eliminado correctamente"});
      }, error => {
        console.log(error);
        let capturaError = <any>error;
        let errorCodigo;
        let body;
        if (capturaError != null) {
          body = JSON.parse(error._body);
          this.lanzarToach("Ha ocurrido un error al borrar el caballo.");
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
  dismiss() {
    this.viewCtrl.dismiss();
  }

}
