import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    
  ],
  imports: [
    FormsModule,
    HttpModule,
    IonicPageModule.forChild(LoginPage),
  ],
})
export class LoginPageModule {}
