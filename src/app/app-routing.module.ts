import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HijoComponent } from './hijo/hijo.component';
import { PadreComponent } from './padre/padre.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PruebaComponent } from './prueba/prueba.component';
import { LoginComponent } from './login/login.component';
import { PersonalAdressComponent } from './Adress/personal-adress/personal-adress.component';
import { AlladressComponent } from './Adress/alladress/alladress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterAdressComponent } from './Adress/register-adress/register-adress.component';
import { MapComponent } from './map/map.component';

const routes: Routes = [
    { path: 'prueba', component: PruebaComponent },
    { path: 'login', component: LoginComponent },
    { path: 'map', component: MapComponent },
    { path: 'personalAdress', component: PersonalAdressComponent },
    { path: 'registerAdress', component: RegisterAdressComponent },
    { path: 'Dashboard', component: DashboardComponent },
    { path: 'allAdress', component: AlladressComponent },
  { path: 'padre', component: PadreComponent,children:[  { path: 'hijo', component: HijoComponent }] },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
