import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController, ModalController } from 'ionic-angular';
import { Pista } from '../../models/pista';
import { PistaService } from '../../providers/servicios/pista.service';
import { PistaDetallePage } from '../pista-detalle/pista-detalle';
import { PistaModalPage } from '../pista-modal/pista-modal';

/**
 * Generated class for the AdminPistaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-pista',
  templateUrl: 'admin-pista.html',
  providers: [PistaService]
})
export class AdminPistaPage {
  pistas: Pista[];
  constructor(public modalCtrl: ModalController, public pistaService: PistaService, public toastCtrl: ToastController, public viewCtrl: ViewController,
    public navCtrl: NavController, public navParams: NavParams) {
    this.obtenerPistar();
  }
  obtenerPistar() {
    this.pistaService.obtenerPistas().subscribe(
      response => {
        this.pistas = response;
      }, error => {
        var capturaError = <any>error;
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
  actualizar(pista: Pista) {
    this.navCtrl.push(PistaDetallePage, { nuevo: false, pista: pista });
  }
  borrar(pista: Pista) {
    this.navCtrl.push(PistaModalPage, { pista: pista});

  }
  anadir() {
    this.navCtrl.push(PistaDetallePage, { nuevo: true });
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
