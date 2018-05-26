import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { Pista } from '../../models/pista';
import { GrupoService } from '../../providers/servicios/grupo.service';
import { PistaService } from '../../providers/servicios/pista.service';
import { AdminPistaPage } from '../admin-pista/admin-pista';

/**
 * Generated class for the PistaModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pista-modal',
  templateUrl: 'pista-modal.html',
  providers: [PistaService]
})
export class PistaModalPage {
  pista: Pista;
  constructor(public pistaService: PistaService, public toastCtrl: ToastController, public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
    this.pista = this.navParams.get('pista');
  }

  borrar() {
    console.log(this.pista);
    this.pistaService.borrar(this.pista).subscribe(
      response => {
        this.lanzarToach("La pista se borro correctamente");
        this.navCtrl.push(AdminPistaPage);
      }, error => {
        var capturaError = <any>error;
        console.log(capturaError  );
        var errorCodigo;
        if (capturaError != null) {
          var body = JSON.parse(error._body);
          errorCodigo = body.codigo;
          if (errorCodigo == 1100)
            this.lanzarToach(body.error);
          else
            this.lanzarToach("Ha ocurrido un error inesperado intentelo mas tarde");
          return false;
        }
      }
    );
  }


  dismiss() {
    this.viewCtrl.dismiss();
  }
  lanzarToach(mensaje) {
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 3000,
      dismissOnPageChange: true
    });
    toast.present();
  }
}
