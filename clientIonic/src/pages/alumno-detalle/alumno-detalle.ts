import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { AlumnoDetallePageModule } from './alumno-detalle.module';
import { Grupo } from '../../models/grupo';
import { Alumno } from '../../models/alumno';
import { GrupoService } from '../../providers/servicios/grupo.service';
import { AlumnoService } from '../../providers/servicios/alumno.service';
import { AdminAlumnoPage } from '../admin-alumno/admin-alumno';

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
  alumno: Alumno;
  id: Number;
  grupo: Grupo;
  grupos: Grupo[];
  cambiar: Boolean;
  constructor(public toastCtrl: ToastController, public grupoService: GrupoService, public alumnoService: AlumnoService, public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
    this.alumno = navParams.get('alumno');
    this.cambiar = navParams.get('cambiar');
    this.id;
    this.grupo;
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
  lanzarToach(mensaje) {
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 3000,
      dismissOnPageChange: true
    });
    toast.present();
  }

  actualizarAlumnoGrupo() {
    let grupo: Grupo = null;
    if(this.id==null){
      this.lanzarToach("Por favor, debes de seleccionar un grupo");
      return false;
    }
      
    this.grupoService.obtenerGrupoById(this.id).subscribe(
      response => {
        grupo = response;
        this.alumno.grupo = grupo;
        this.alumnoService.actualizarAlumnoGrupo(this.alumno).subscribe(
          response => {
            this.navCtrl.push(AdminAlumnoPage, {mensaje: 'El alumno '+ this.alumno.nombre + ' se ha cambiado correctamente al grupo '+ grupo.nombre});
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
            }
          }
        );
      }
      , error => {
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
    )

  }
  onSelectChange(selectedValue: Number) {
    this.id = selectedValue;
    console.log(this.id);
  }
}

