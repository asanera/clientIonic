import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Grupo } from '../../models/grupo';
import { GrupoService } from '../../providers/servicios/grupo.service';

/**
 * Generated class for the GrupoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-grupo',
  templateUrl: 'grupo.html',
  providers: [GrupoService]

})
export class GrupoPage {

  grupo: Grupo;
  constructor(public grupoService: GrupoService,public toastCtrl: ToastController,public navCtrl: NavController, public navParams: NavParams) {
    this.grupo = new Grupo(-1,"",null);
  }

  guardarGrupo() {
    console.log(this.grupo);
    this.grupoService.guardarGrupo(this.grupo).subscribe(
      response => {
        let grupo = response;
        console.log(grupo);
        if (this.grupo == null)
          this.lanzarToast("Lo sentimos, el grupo no se ha guarado correctamente");
        else
        this.lanzarToast("El grupo se ha guardado correctamente");
      }, error => {
        let capturaError = <any>error;
        let errorCodigo;
        let body;
        if (capturaError != null) {
          body = JSON.parse(error._body);
          errorCodigo = body.codigo;
          if (errorCodigo == 1100)
            this.lanzarToast(body.error);
          else
            this.lanzarToast("Ha ocurrido un error inesperado intentelo mas tarde");
        }
      }
    );
    this.grupo = new Grupo(-1,"",null);
  }
  lanzarToast(mensaje) {
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 3000,
      dismissOnPageChange: true
    });
    toast.present();
  }

}
