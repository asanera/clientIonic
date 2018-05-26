import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { PistaService } from '../../providers/servicios/pista.service';
import { Pista } from '../../models/pista';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AdminPistaPage } from '../admin-pista/admin-pista';

/**
 * Generated class for the PistaDetallePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pista-detalle',
  templateUrl: 'pista-detalle.html',
  providers: [PistaService]
})
export class PistaDetallePage {

  pista: Pista;
  nuevo: Boolean;
  constructor(public pistaService: PistaService, public toastCtrl: ToastController, public viewCtrl: ViewController,
    public navCtrl: NavController, public navParams: NavParams) {
    this.nuevo = this.navParams.get('nuevo');
    if (this.nuevo)
      this.pista = new Pista(-1, '');
    else
      this.pista = this.navParams.get('pista');
    console.log(this.pista);
  }

  onSubmit() {
    if (this.nuevo)
      this.guardar();
    else
      this.actualizar();
  }
  actualizar() {
    this.pistaService.anadirActualiza(this.pista).subscribe(
      response => {
        this.pista = response;
        if (this.pista == null)
          this.lanzarToach("La pista no se ha actualizado correctamente");
        else
          this.navCtrl.push(AdminPistaPage);
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
  guardar() {
    this.pistaService.anadirActualiza(this.pista).subscribe(
      response => {
        this.pista = response;
        if (this.pista == null)
          this.lanzarToach("La pista no se ha añadido correctamente");
        else
          this.navCtrl.push(AdminPistaPage);
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
