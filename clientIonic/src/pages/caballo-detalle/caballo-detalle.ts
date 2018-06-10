import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { Caballo } from '../../models/caballo';
import { CaballoService } from '../../providers/servicios/caballo.service';
import { AdminCaballoPage } from '../admin-caballo/admin-caballo';


@IonicPage()
@Component({
  selector: 'page-caballo-detalle',
  templateUrl: 'caballo-detalle.html',
  providers: [CaballoService]
})
export class CaballoDetallePage {

  caballo: Caballo;
  nuevo: Boolean
  fecha: Date;
  nombre: String;
  constructor(public toastCtrl: ToastController, public viewCtrl: ViewController, public caballoService: CaballoService, public navCtrl: NavController, public navParams: NavParams) {
    this.nuevo = this.navParams.get('nuevo');
    if (!this.nuevo) {
      this.caballo = this.navParams.get('caballo');
      this.fecha = this.caballo.fechaNacimiento;
      this.nombre = this.caballo.nombre;
    } else {
      this.caballo = new Caballo(-1, '', '', new Date(), null);
      this.fecha = new Date();
    }

  }

  onSubmit() {
    if (!this.nuevo)
      this.actualizar();
    else
      this.anadir();
  }
  actualizar() {
    console.log(this.fecha);
    this.caballo.fechaNacimiento = this.fecha;
    this.caballoService.actualizar(this.caballo, this.nombre).subscribe(
      response => {
        this.caballo = response;
        if (this.caballo == null)
          this.lanzarToach("El caballo no se ha actualizado correctamente");
        else
          this.navCtrl.push(AdminCaballoPage, { mensaje: "El caballo " + this.caballo.nombre + " se ha actualizado correctamente" });
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
  anadir() {
    this.caballo.fechaNacimiento = this.fecha;
    this.caballoService.anadir(this.caballo).subscribe(
      response => {
        this.caballo = response;
        if (this.caballo == null)
          this.lanzarToach("El caballo no se ha añadido correctamente");
        else
          this.navCtrl.push(AdminCaballoPage, { mensaje: "El caballo " + this.caballo.nombre + " se ha añadido correctamente" });
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
