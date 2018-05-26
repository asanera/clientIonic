import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { RegistrarService } from '../../providers/servicios/registrar.service';
import { Alumno } from '../../models/alumno';
import { Profesor } from '../../models/profesor';
import { Person } from '../../models/person';
import { FormGroup } from '@angular/forms';
import { LoginPage } from '../login/login';


@IonicPage()
@Component({
  selector: 'page-registrar',
  templateUrl: 'registrar.html',
  providers: [RegistrarService]
})
export class RegistrarPage {

  public alumno: Alumno;
  public profesor: Profesor;
  public person: Person;
  public role;
  public fecha: Date;
  public registroCorrecto;
  public registrarForm: FormGroup;
  public repetirPass;
  public repetirPassKo: Boolean;

  constructor(public toastCtrl: ToastController, public registrarService: RegistrarService, public navCtrl: NavController, public navParams: NavParams) {
    this.profesor = new Profesor('', -1, false, null, null, null, '', '', null, '', '', '', '', -1);
    this.alumno = new Alumno(0, 0, '', null, null, null, '', '', null, '', '', '', -1, new Date());
    this.person = new Person('', '', '', '', '', '', -1);
    this.role = 'alumno';
    this.repetirPass = '';
    this.repetirPassKo = false;
    this.registroCorrecto = false;
    this.fecha = new Date();

  }
  onChange(value) {
    this.role = value;
  }

  registrar() {
    (this.role);
    if (this.role == "alumno") {
      this.registrarAlumno();
    } else {
      this.registrarProfesor();
    }
  }
  registrarAlumno() {
    if (this.validacionComun()) {
      if (this.validarDatosAlumno()) {
        this.alumno.nombre = this.person.nombre;
        this.alumno.apellidos = this.person.apellidos;
        this.alumno.direccion = this.person.direccion;
        this.alumno.fechaNacimiento = this.fecha;
        this.alumno.dni = this.person.dni;
        this.alumno.email = this.person.email;
        this.alumno.password = this.person.password;
        this.registrarAlumnoServiceImpl();
      }
    }

  }
  validarDatosAlumno() {
    //Validar dni
    let salto = Number.parseInt(this.alumno.salto.toString().replace('"', ""));
    let galope = Number.parseInt(this.alumno.galope.toString().replace('"', ""));
    if (!Number.isInteger(galope) || !Number.isInteger(salto)) {
      this.crearToast("Salto o Galope no es un numero");
      return false
    } else {
      if (this.alumno.salto < 0 || this.alumno.salto > 7 || this.alumno.galope < 0 || this.alumno.galope > 7) {
        this.crearToast("Salto o Galope es menor de 0 o mayor de 7");
        return false;
      }
    }
    return true;
  }
  validacionComun() {
    if (this.person.nombre.length < 3) {
      this.crearToast("El nombre tiene que ser mayor de 3 caracteres");
      return false
    } else if (this.fecha == null) {
      this.crearToast("Debes de colocar una fecha de nacimiento");
      console.log(this.person);
      return false
    }
    else if (this.person.apellidos.length < 3) {
      this.crearToast("Los apellidos tienen que ser mayor de 3 caracteres");
      return false
    } else if (this.person.direccion.length < 3) {
      this.crearToast("La direccion tiene que ser mayor de 3 caracteres");
      return false
    } else if (this.person.password.length < 3) {
      this.crearToast("La contraseña tiene que ser mayor de 3 caracteres");
      return false
    }
    return true;
  }

  registrarAlumnoServiceImpl() {
    this.registrarService.registrarAlumno(this.alumno).subscribe(
      //Bloque Alumno
      response => {
        let alumnoResponse = response;
        this.crearToast("Te has registrado correctamente");
        this.navCtrl.push(LoginPage);
        return true;
      }, error => {
        this.mostrarError(error);
      }

    );
  }
  

  mostrarError(error) {
    let capturaError = <any>error;
    let errorCodigo;
    let body;
    if (capturaError != null) {
      body = JSON.parse(error._body);
      errorCodigo = body.codigo;
      if (errorCodigo == 1002) {
        this.crearToast(body.error);
        return false;
      }
    }

  }
  registrarProfesor() {
    if (this.validacionComun()) {
      this.profesor.nombre = this.person.nombre;
      this.profesor.apellidos = this.person.apellidos;
      this.profesor.direccion = this.person.direccion;
      this.profesor.fechaNacimiento = this.fecha;
      this.profesor.dni = this.person.dni;
      this.profesor.email = this.person.email;
      this.profesor.password = this.person.password;
      this.registrarPrfesorServiceImpl();
    }
  }
  registrarPrfesorServiceImpl() {
    this.registrarService.registrarProfesor(this.profesor).subscribe(
      //Bloque Alumno
      response => {
        this.crearToast("Te has registrado correctamente");
        this.navCtrl.push(LoginPage)
      }, error => {
        this.mostrarError(error);
      }

    );
  }
  public crearToast(mensaje) {
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 3000,
      dismissOnPageChange: true
    });
    toast.present();
  }
  onKey(event: any) {
    if (this.repetirPass != this.person.password) {
      this.repetirPassKo = true;
    } else {
      this.repetirPassKo = false;
    }


  }
}
