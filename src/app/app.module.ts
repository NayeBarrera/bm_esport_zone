import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RegisterPage } from './views/auth/component/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginPage } from './views/auth/component/login/login.page';

@NgModule({
  declarations: [
    //Aqui se colocan los nuevos componentes que vayas a agregar siempre sean desde views
    AppComponent,
    LoginPage,
    RegisterPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}