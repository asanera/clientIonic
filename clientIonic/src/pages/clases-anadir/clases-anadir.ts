import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Clase } from '../../models/clase';
import { AuthService } from '../../providers/servicios/auth.service';
import { Pista } from '../../models/pista';
import { PistaService } from '../../providers/servicios/pista.service';
import { Grupo } from '../../models/grupo';
import { GrupoService } from '../../providers/servicios/grupo.service';
import { ClaseService } from '../../providers/servicios/clases.service';
import { AsignacionService } from '../../providers/servicios/asignacion.service';
import { AsignacionesPage } from '../asignaciones/asignaciones';


/**
 * Generated class for the ClasesAnadirPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-clases-anadir',
  templateUrl: 'clases-anadir.html',
  providers: [AuthService, PistaService, GrupoService, ClaseService, AsignacionService]
})
export class ClasesAnadirPage {

  clase: Clase;
  nuevo: Boolean;
  fecha: string;
  hora: string;
  pistas: Pista[];
  grupos: Grupo;
  idPista: Number;
  idGrupo: Number;
  noAsignaciones: Boolean;
  fechaMin;
  
  constructor(public asignacionService: AsignacionService,public claseService: ClaseService, public grupoService: GrupoService, public pistaService: PistaService, public authService: AuthService, public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams) {
    this.nuevo = this.navParams.get('nuevo');
    if (this.nuevo)
      this.clase = new Clase(-1, "", "", new Date(), null, this.authService.getProfesor(), null, null);
    else
      this.clase = this.navParams.get('clase');

    this.fecha;
    this.hora;
    this.idGrupo;
    this.idPista;
    this.noAsignaciones = true;
    this.fechaMin = new Date().toJSON().split('T')[0];
    this.cargarPistas()
    this.cargaGrupo()
  }

  submit() {
    if (this.nuevo)
      this.guardar()
    else
      this.actualizar()
  }
  guardar() {
    if (!this.validar())
      return false;

    this.setearCampos()
    this.claseService.guardar(this.clase, this.idGrupo).subscribe(
      response => {
        console.log(response);
        this.clase = response;
        this.noAsignaciones = false;
        this.lanzarToach("La operación ha sido todo un éxito");
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
  actualizar() {


  }
  setearCampos() {
    let aux;
    aux = Date.parse(this.fecha + ' ' + this.hora);
    let fecha = new Date(aux);
    this.clase.fecha = fecha;
    this.pistas.forEach(pista => {
      if (pista.id == this.idPista) {
        this.clase.pista = pista;
        return;
      }
    });
    console.log(this.clase);
  }
  validar(): Boolean {
    if (this.idPista == null) {
      this.lanzarToach("Por favor, debes de seleccionar una pista");
      return false;
    } else if (this.idGrupo == null) {
      this.lanzarToach("Por favor, debes de seleccionar un grupo");
      return false;
    } else if (this.fecha == null) {
      this.lanzarToach("Por favor, la fecha es obligatoria");
      return false;
    } else if (this.hora == null) {
      this.lanzarToach("Por favor, debes de seleccionar una hora");
      return false;
    }
    return true;
  }
  cargaGrupo() {
    this.grupoService.obtenerGrupos().subscribe(
      response => {
        this.grupos = response;
      }, error => {
        let capturaError = <any>error;
        let errorCodigo;
        let body;
        if (capturaError != null) {
          body = JSON.parse(error._body);
          errorCodigo = body.codigo;
          if (errorCodigo == 1100)
            this.lanzarToach(body.error);
          else
            this.lanzarToach("Ha ocurrido un error al procesar los grupos.");
        }
      }
    );
  }

  cargarPistas() {
    this.pistaService.obtenerPistas().subscribe(
      response => {
        this.pistas = response;
      }, error => {
        let capturaError = <any>error;
        let errorCodigo;
        let body;
        if (capturaError != null) {
          body = JSON.parse(error._body);
          errorCodigo = body.codigo;
          if (errorCodigo == 1100)
            this.lanzarToach(body.error);
          else
            this.lanzarToach("Ha ocurrido al procesar las pistas.");
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
  onSelectChangePista(selectedValue: Number) {
    this.idPista = selectedValue;
  }
  onSelectChangeGrupo(selectedValue: Number) {
    this.idGrupo = selectedValue;
  }

  crearAsignacionesAleatoria(){
    console.log(this.clase);
    this.asignacionService.generarAsignacionesAleatorias(this.clase).subscribe(
      response => {
        this.clase.asignaciones = response;
        this.navCtrl.push(AsignacionesPage, {asignaciones: this.clase.asignaciones});
      }, error => {
        let capturaError = <any>error;
        let errorCodigo;
        let body;
        if (capturaError != null) {
          body = JSON.parse(error._body);
          errorCodigo = body.codigo;
          if (errorCodigo == 1100)
            this.lanzarToach(body.error);
          else
            this.lanzarToach("Ha ocurrido un error en las asignaciones.");
        }
      }
    );
  }

}
