import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController } from 'ionic-angular';
import { Alumno } from '../../models/alumno';
import { AlumnoService } from '../../providers/servicios/alumno.service';
import { AlumnoDetallePage } from '../alumno-detalle/alumno-detalle';
import { AlumnoDetallePageModule } from '../alumno-detalle/alumno-detalle.module';

/**
 * Generated class for the AdminAlumnoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-alumno',
  templateUrl: 'admin-alumno.html',
  providers: [AlumnoService]
})
export class AdminAlumnoPage {

  alumnos: Alumno[];
  mensaje: String;
  constructor(public modalCtrl: ModalController,public toastCtrl: ToastController, public alumnoServie: AlumnoService, public navCtrl: NavController, public navParams: NavParams) {
    this.alumnos = null;
    this.obtenerAlumno();
  }
  ionViewDidEnter(){
    this.mensaje = null;
    this.mensaje = this.navParams.get("mensaje");
    if(this.mensaje !=null){
      this.lanzarToach(this.mensaje);
    }
  }
  obtenerAlumno() {
    this.alumnoServie.obtenerAlumnos().subscribe(
      response => {
        this.alumnos = response;
        if (this.alumnos.length == 0) {
          this.lanzarToach("Actualmente no hay alumnos");
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

  cambiarGrupo(alumno){
    this.navCtrl.push(AlumnoDetallePage,{ alumno: alumno, cambiar: true }); 
  }

  detalleAlumno(alumno){
    let modal = this.modalCtrl.create(AlumnoDetallePage,{ alumno: alumno,cambiar: false });
    modal.present();
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
      this.obtenerAlumno();
      return;
    }
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.alumnos = this.alumnos.filter((item) => {
        return (item.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }


}
