import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from '@angular/common/http';
import { LoginPage } from '../pages/login/login';
import { HttpModule } from '@angular/http';
import { InicioPage } from '../pages/inicio/inicio';
import { AjustesPage } from '../pages/ajustes/ajustes';
import { CerrarSesionPage } from '../pages/cerrar-sesion/cerrar-sesion';
import { ClaseDetallePage } from '../pages/clase-detalle/clase-detalle';
import { RegistrarPage } from '../pages/registrar/registrar';
import { AdminPage } from '../pages/admin/admin';
import { AdminGrupoPage } from '../pages/admin-grupo/admin-grupo';
import { AdminAlumnoPage } from '../pages/admin-alumno/admin-alumno';
import { AdminProfesorPage } from '../pages/admin-profesor/admin-profesor';
import { AdminPistaPage } from '../pages/admin-pista/admin-pista';
import { AlumnoDetallePage } from '../pages/alumno-detalle/alumno-detalle';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    InicioPage,
    AjustesPage,
    CerrarSesionPage,
    ClaseDetallePage,
    RegistrarPage,
    AdminPage,
    AdminGrupoPage,
    AdminAlumnoPage,
    AdminProfesorPage,
    AdminPistaPage,
    AlumnoDetallePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule, 
    HttpModule,   
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    InicioPage,
    AjustesPage,
    CerrarSesionPage,
    ClaseDetallePage,
    RegistrarPage,
    AdminPage,
    AdminGrupoPage,
    AdminAlumnoPage,
    AdminProfesorPage,
    AdminPistaPage,
    AlumnoDetallePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    
  ]
})
export class AppModule {}