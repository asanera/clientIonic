import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { LoginService } from '../../providers/servicios/login.service';
import { Person } from '../../models/person';
import { TabsPage } from '../tabs/tabs';
import { TabPageModule } from '../tabs/tabs.module';
import { Alumno } from '../../models/alumno';
import { Profesor } from '../../models/profesor';
import { AuthService } from '../../providers/servicios/auth.service';
import { RegistrarPage } from '../registrar/registrar';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [LoginService, AuthService]
})
export class LoginPage {

  personaLoguear: Person;
  mensajeError;
  public identidadAlumno: Alumno;
  public identidadProfesor: Profesor;
  public registrarPage;
  constructor(public toastCtrl: ToastController ,public navCtrl: NavController, public navParams: NavParams, private authService: AuthService, public loginService: LoginService) {
    this.personaLoguear = new Person('', '', '', '', '', '', -1);
    this.identidadAlumno = authService.getAlumno();
    this.identidadProfesor = authService.getProfesor();
    this.registrarPage = RegistrarPage
  }

  ionViewDidLoad() {
    if (this.identidadAlumno || this.identidadProfesor){
      this.navCtrl.push(TabsPage);
    }
  }
 
  login() {
    this.loginService.loguearAlumno(this.personaLoguear).subscribe(
      //Bloque Alumno
      response => {
        this.crearSesionAlumno(response);
        this.navCtrl.push(TabsPage);
        return true;
      }, error => {
        (error);
        var capturaError = <any>error;
        var errorCodigo;
        var body;
        if (capturaError != null) {
          body = JSON.parse(error._body);
          errorCodigo = body.codigo;
          if (errorCodigo == 1000) {
            this.crearToast(body.error);
            return false;
          } else if (errorCodigo == 1001) {
            this.loginService.loguearProfesor(this.personaLoguear).subscribe(
              //Bloque Profesor
              response => {
                (response);
                this.crearSesionProfesor(response);
                this.navCtrl.push(TabsPage);
                return true;
              }, error => {
                var capturaError = <any>error;
                if (capturaError != null) {
                  var body = JSON.parse(error._body);
                  this.crearToast(body.error);
                  return false;
                }
              }
            );
          }

        }
      }
    );
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

  public crearToast(mensaje){
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 3000
    });
    toast.present();
  }

}
