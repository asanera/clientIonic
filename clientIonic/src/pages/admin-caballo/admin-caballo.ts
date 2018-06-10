import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Caballo } from '../../models/caballo';
import { CaballoService } from '../../providers/servicios/caballo.service';
import { CaballoDetallePage } from '../caballo-detalle/caballo-detalle';
import { ModalCaballoPage } from '../modal-caballo/modal-caballo';

/**
 * Generated class for the AdminCaballoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-caballo',
  templateUrl: 'admin-caballo.html',
  providers: [CaballoService]
})
export class AdminCaballoPage {

  caballos: Caballo[];
  mensaje: String;
  constructor(public caballosService: CaballoService,public toastCtrl: ToastController,public navCtrl: NavController, public navParams: NavParams) {
    
  }
  ionViewWillEnter(){
    this.obtenerCaballos();
   
  }
  ionViewDidEnter(){
    this.mensaje = null;
    this.mensaje = this.navParams.get("mensaje");
    if(this.mensaje !=null){
      this.lanzarToach(this.mensaje);
    }
  }
  obtenerCaballos(){
    this.caballosService.obtenerCaballos().subscribe(
      response => {
        this.caballos = response;
      }, error => {
        let capturaError = <any>error;
        let errorCodigo;
        let body;
        if (capturaError != null) {
          body = JSON.parse(error._body);
          this.lanzarToach("Ha ocurrido un error en las asignaciones.");
        }
      }
    );
  }
  actualizar(caballo: Caballo){
    this.navCtrl.push(CaballoDetallePage, {caballo: caballo, nuevo: false});
  }
  anadir(){
    this.navCtrl.push(CaballoDetallePage, {nuevo: true});
  }
  borrar(caballo: Caballo){
    this.navCtrl.push(ModalCaballoPage,{caballo: caballo});
  }
  lanzarToach(mensaje) {
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 3000,
      dismissOnPageChange: true
    });
    toast.present();
  }
  getItems(ev) {
    // Reset items back to all of the items
    var val = ev.target.value;
    if (val == undefined || val == '') {
      this.obtenerCaballos();
      return;
    }
    // set val to the value of the ev target

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.caballos = this.caballos.filter((item) => {
        return (item.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
}
