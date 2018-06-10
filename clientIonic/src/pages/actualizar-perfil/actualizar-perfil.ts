import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AuthService } from '../../providers/servicios/auth.service';
import { RegistrarService } from '../../providers/servicios/registrar.service';
import { Alumno } from '../../models/alumno';
import { Profesor } from '../../models/profesor';
import { FormGroup } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-actualizar-perfil',
  templateUrl: 'actualizar-perfil.html',
  providers: [AuthService, RegistrarService]
})
export class ActualizarPerfilPage {

  public identidadAlumno: Alumno;
  public identidadProfesor: Profesor;
  public fecha: Date;
  public registroCorrecto: Boolean;
  public actualizarForm: FormGroup;
  public repetirPass: String;
  public repetirPassKo: Boolean;

  constructor(public toastCtrl: ToastController, public authService: AuthService, public registrarService: RegistrarService, public navCtrl: NavController, public navParams: NavParams) {
    this.identidadAlumno = authService.getAlumno();
    this.identidadProfesor = authService.getProfesor();
    this.repetirPass = '';
    this.repetirPassKo = false;
    this.registroCorrecto = false;
    if (this.identidadAlumno) {
      this.fecha = this.identidadAlumno.fechaNacimiento;      
      this.identidadAlumno.cuentaBancaria = '';
      this.identidadAlumno.password = '';
    }
    else {
      this.fecha = this.identidadProfesor.fechaNacimiento;
      this.identidadProfesor.password = '';
    }
  }

  actualizar() {
    if (this.identidadAlumno) {
      if (this.validarAlumno())
        this.actualizarAlumno();
    } else
      if (this.validarProfesor())
        this.actualizarProfesor();
  }
  
  actualizarProfesor() {
    let profesor: Profesor = this.identidadProfesor;
    profesor.fechaNacimiento = this.fecha;
    this.registrarService.actulizarProfesor(profesor).subscribe(
      response => {
        this.crearSesionProfesor(response);
        this.crearToast("Tu perfil se ha actualizado correctamente");
      }, error => {
        let capturaError = <any>error;
        let errorCodigo;
        let body;
        if (capturaError != null) {
          body = JSON.parse(error._body);
          errorCodigo = body.codigo;
          if (errorCodigo == 1002)
            this.crearToast(body.error);
          else
            this.crearToast("Ha ocurrido un error inesperado intentelo mas tarde");
        }
      }
    );
  }
  
  actualizarAlumno() {
    let alumno: Alumno = this.identidadAlumno;
    alumno.fechaNacimiento = this.fecha;
    this.registrarService.actulizarAlumno(alumno).subscribe(
      response => {
        this.crearSesionAlumno(response);
        this.crearToast("Tu perfil se ha actualizado correctamente");
      }, error => {
        console.log(error)
        let capturaError = <any>error;
        let errorCodigo;
        let body;
        if (capturaError != null) {
          body = JSON.parse(error._body);
          errorCodigo = body.codigo;
          if (errorCodigo == 1002)
            this.crearToast(body.error);
          else
            this.crearToast("Ha ocurrido un error inesperado intentelo mas tarde");
        }
      }
    );
  }
  validarProfesor(){
    if (this.identidadProfesor.nombre.length < 3) {
      this.crearToast("El nombre tiene que ser mayor de 3 caracteres");
      return false
    } else if (this.fecha == null) {
      this.crearToast("Debes de colocar una fecha de nacimiento");
      return false
    }
    else if (this.identidadProfesor.apellidos.length < 3) {
      this.crearToast("Los apellidos tienen que ser mayor de 3 caracteres");
      return false
    } else if (this.identidadProfesor.direccion.length < 3) {
      this.crearToast("La direccion tiene que ser mayor de 3 caracteres");
      return false
    } else if (this.identidadProfesor.password.length < 3) {
      this.crearToast("La contraseña tiene que ser mayor de 3 caracteres");
      return false
    }
    return true;
  }
  validarAlumno() {
    if (this.identidadAlumno.nombre.length < 3) {
      this.crearToast("El nombre tiene que ser mayor de 3 caracteres");
      return false
    } else if (this.fecha == null) {
      this.crearToast("Debes de colocar una fecha de nacimiento");
      return false
    }
    else if (this.identidadAlumno.apellidos.length < 3) {
      this.crearToast("Los apellidos tienen que ser mayor de 3 caracteres");
      return false
    } else if (this.identidadAlumno.direccion.length < 3) {
      this.crearToast("La direccion tiene que ser mayor de 3 caracteres");
      return false
    } else if (this.identidadAlumno.password.length < 3) {
      this.crearToast("La contraseña tiene que ser mayor de 3 caracteres");
      return false
    }
    return true;
  }
  crearToast(mensaje) {
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 3000,
      dismissOnPageChange: true
    });
    toast.present();
  }
  onKey(event: any) {
    if (this.identidadAlumno) {
      if (this.repetirPass != this.identidadAlumno.password) {
        this.repetirPassKo = true;
      } else {
        this.repetirPassKo = false;
      }
    } else {
      if (this.repetirPass != this.identidadProfesor.password) {
        this.repetirPassKo = true;
      } else {
        this.repetirPassKo = false;
      }
    }

  }
  private crearSesionAlumno(response) {
    this.generacionLocalStorage(response, "identidadAlumno");
  }

  private crearSesionProfesor(response) {
    this.generacionLocalStorage(response, "identidadProfesor");
  }

  private generacionLocalStorage(response, key) {
    // crear la sesión en el localstorage
    localStorage.setItem(key, JSON.stringify(response));
    return true;
  }


}
