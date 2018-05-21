import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { AlumnoDetallePageModule } from './alumno-detalle.module';
import { Grupo } from '../../models/grupo';
import { Alumno } from '../../models/alumno';
import { GrupoService } from '../../providers/servicios/grupo.service';
import { AlumnoService } from '../../providers/servicios/alumno.service';

/**
 * Generated class for the AlumnoDetallePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-alumno-detalle',
  templateUrl: 'alumno-detalle.html',
  providers: [GrupoService, AlumnoService]
})
export class AlumnoDetallePage {
  public alumno: Alumno;
  public grupo: Grupo;
  public grupos: Grupo[];
  public cambiar: Boolean;
  constructor(public toastCtrl: ToastController, public grupoService: GrupoService, public alumnoService: AlumnoService, public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
    this.alumno = navParams.get('alumno');
    this.cambiar = navParams.get('cambiar');
    this.grupo = this.alumno.grupos[this.alumno.grupos.length - 1];
    (this.alumno);
    this.obtenerGrupos();
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  obtenerGrupos() {
    this.grupoService.obtenerGrupos().subscribe(
      response => {
        this.grupos = response;
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
  mostrarError(mensaje) {
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 3000,
      dismissOnPageChange: true
    });
    toast.present();
  }

  actualizarAlumnoGrupo() {
    let error: boolean = false;
    this.grupoService.obtenerGrupoByNombre(this.grupo).subscribe(
      response => {
        this.grupo = response;
        console.log(response);
      }, error => {
        this.mostrarError("Ha ocurrido un error inesperado, intentelo más tade");
        error = true;
      }
    );
    if (error)
      return;
    this.alumno.grupos.push(this.grupo);

    this.alumnoService.actualizarAlumno(this.alumno).subscribe(
      response => {
        this.alumno = response;
        console.log(this.alumno);
        if (this.alumno != null) {
          this.mostrarError("Se ha añadido el grupo correctamente");
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

}
