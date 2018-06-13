import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController } from 'ionic-angular';
import { GrupoService } from '../../providers/servicios/grupo.service';
import { GrupoDetalleAlumnoPage } from '../grupo-detalle-alumno/grupo-detalle-alumno';
import { Grupo } from '../../models/grupo'
import { GrupoPage } from '../grupo/grupo';
/**
 * Generated class for the AdminGrupoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-grupo',
  templateUrl: 'admin-grupo.html',
  providers: [GrupoService]
})
export class AdminGrupoPage {


  grupos: Grupo[];
  mensaje: String;
  constructor(public modalCtrl: ModalController, public toastCtrl: ToastController, public grupoService: GrupoService, public navCtrl: NavController, public navParams: NavParams) {
    this.grupos = null;
    this.obtenerGrupos();
  }
  ionViewDidEnter(){
    this.mensaje = null;
    this.mensaje = this.navParams.get("mensaje");
    if(this.mensaje !=null){
      this.lanzarToach(this.mensaje);
    }
  }
  obtenerGrupos() {
    this.grupoService.obtenerGrupos().subscribe(
      response => {
        this.grupos = response;
        if (this.grupos.length == 0) {
          this.lanzarToach("Actualmente no hay grupos");
        }
      }, error => {
        var capturaError = <any>error;
        if (capturaError != null) {
          var body = JSON.parse(error._body);
          this.lanzarToach(body.error);
          this.lanzarToach(error);
        }
      }
    );
  }

  borrarGrupo(grupo) {
   this.navCtrl.push(GrupoDetalleAlumnoPage, { grupo: grupo, mostrarAlumnos: false });
    
  }
  grupoAlumnos(id) {
    let modal = this.modalCtrl.create(GrupoDetalleAlumnoPage, { idGrupo: id, mostrarAlumnos: true });
    modal.present();
  }
  anadirGrupo(){
    this.navCtrl.push(GrupoPage,{nuevo:true});
  }
  actualizar(grupo){
    this.navCtrl.push(GrupoPage,{nuevo:false, grupo:grupo});
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
