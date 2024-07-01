import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PadreComponent } from './padre/padre.component';
import { HijoComponent } from './hijo/hijo.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PruebaComponent } from './prueba/prueba.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AlladressComponent } from './Adress/alladress/alladress.component';
import { PersonalAdressComponent } from './Adress/personal-adress/personal-adress.component';
import {MatDividerModule} from '@angular/material/divider';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterAdressComponent } from './Adress/register-adress/register-adress.component';
import { CookieService } from 'ngx-cookie-service';
import { LoggedNavbarComponent } from './navbar/logged-navbar/logged-navbar.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { MapComponent } from './map/map.component';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  declarations: [
    AppComponent,
    PadreComponent,
    HijoComponent,
    NotFoundComponent,
    PruebaComponent,
    LoginComponent,
    NavbarComponent,
    AlladressComponent,
    PersonalAdressComponent,
    DashboardComponent,
    RegisterAdressComponent,
    LoggedNavbarComponent,
    MapComponent,

  ],
  imports: [
    BrowserModule,
    GoogleMapsModule,
    MatTableModule,
    AppRoutingModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatInputModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatDividerModule,
    MatSidenavModule,
    MatListModule,
    MatSortModule,
    MatPaginatorModule,
    RecaptchaV3Module
    
  ],
  providers: [CookieService, 
    {
    provide: RECAPTCHA_V3_SITE_KEY,
    useValue: '6Lc1JuUpAAAAAHNJwJzMZnzTylJlVZ4tP6P1KXwD', // Reemplaza 'YOUR_SITE_KEY' con tu clave del sitio de reCAPTCHA
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
