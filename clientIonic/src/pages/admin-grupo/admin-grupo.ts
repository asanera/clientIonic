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
  constructor(public modalCtrl: ModalController, public toastCtrl: ToastController, public grupoService: GrupoService, public navCtrl: NavController, public navParams: NavParams) {
    this.grupos = null;
    this.obtenerGrupos();
  }

  obtenerGrupos() {
    this.grupoService.obtenerGrupos().subscribe(
      response => {
        this.grupos = response;
        console.log(this.grupos);
        if (this.grupos.length == 0) {
          this.mostrarError("Actualmente no hay grupos");
        }
      }, error => {
        var capturaError = <any>error;
        if (capturaError != null) {
          var body = JSON.parse(error._body);
          this.mostrarError(body.error);
          this.mostrarError(error);
        }
      }
    );
  }

  borrarGrupo(grupo) {
    let modal = this.modalCtrl.create(GrupoDetalleAlumnoPage, { grupo: grupo, mostrarAlumnos: false });
    modal.present();
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

  mostrarError(mensaje) {
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 3000,
      dismissOnPageChange: true
    });
    toast.present();
  }

}
