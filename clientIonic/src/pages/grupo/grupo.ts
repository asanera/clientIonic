import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Grupo } from '../../models/grupo';
import { GrupoService } from '../../providers/servicios/grupo.service';
import { AdminGrupoPage } from '../admin-grupo/admin-grupo';

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
  nuevo: Boolean;
  constructor(public grupoService: GrupoService, public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams) {
    this.nuevo = this.navParams.get('nuevo');
    console.log("nuevo");
    if (this.nuevo)
      this.grupo = new Grupo(-1, "", null);
    else
      this.grupo = this.navParams.get('grupo');
  }

  guardarGrupo() {
    this.grupoService.guardarGrupo(this.grupo).subscribe(
      response => {
        let grupo = response;
        if (this.grupo == null)
          this.lanzarToast("Lo sentimos, el grupo no se ha guarado correctamente");
        else
         this.navCtrl.push(AdminGrupoPage,{mensaje: 'El grupo '+ this.grupo.nombre + ' se ha creado correctamente'});
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
