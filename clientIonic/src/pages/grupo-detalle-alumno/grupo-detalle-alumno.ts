import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { Grupo } from '../../models/grupo';
import { GrupoService } from '../../providers/servicios/grupo.service';
import { AlumnoService } from '../../providers/servicios/alumno.service';
import { AdminGrupoPage } from '../admin-grupo/admin-grupo';
import { Alumno } from '../../models/alumno';

/**
 * Generated class for the GrupoDetalleAlumnoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-grupo-detalle-alumno',
  templateUrl: 'grupo-detalle-alumno.html',
  providers: [GrupoService, AlumnoService]
})
export class GrupoDetalleAlumnoPage {

  idGrupo: Number;
  grupo: Grupo;
  mostrarAlumno: Boolean;
  alumnos: Alumno[]
  constructor(public toastCtrl: ToastController, public alumnoService: AlumnoService, public grupoService: GrupoService, public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.mostrarAlumno = navParams.get('mostrarAlumnos');
    if (this.mostrarAlumno) {
      this.idGrupo = navParams.get('idGrupo');
      this.alumnoAsociadosGrupo();
    }
    else
      this.grupo = navParams.get('grupo');
  }
  alumnoAsociadosGrupo(){
    this.alumnoService.obtenerAlumnosGrupos(this.idGrupo).subscribe(
      response => {
        this.alumnos = response;
        return true;
      }, error => {
        let capturaError = <any>error;
        let errorCodigo;
        let body;
        if (capturaError != null) {
          body = JSON.parse(error._body);
          errorCodigo = body.codigo;
          if (errorCodigo == 1100)
            this.crearToast(body.error);
          else
            this.crearToast("Ha ocurrido un error inesperado intentelo mas tarde");
        }
      }
    );
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  borrarGrupo() {

    this.grupoService.borrarGrupo(this.grupo).subscribe(
      response => {
        this.navCtrl.push(AdminGrupoPage);
        return true;
      }, error => {
        let capturaError = <any>error;
        let errorCodigo;
        let body;
        if (capturaError != null) {
          body = JSON.parse(error._body);
          errorCodigo = body.codigo;
          if (errorCodigo == 1100)
            this.crearToast(body.error);
          else
            this.crearToast("Ha ocurrido un error inesperado intentelo mas tarde");
        }
      }
    );
  }
  crearToast(mensaje) {
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 3000,
      dismissOnPageChange: true
    });
    toast.present();
  }


}
