import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-padre',
  templateUrl: './padre.component.html',
  styleUrls: ['./padre.component.scss'],
})
export class PadreComponent {
  name:string=""
metodoAInvocar(){
  alert('invocaste un evento')
}
}
