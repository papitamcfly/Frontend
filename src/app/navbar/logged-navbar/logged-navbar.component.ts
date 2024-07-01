import { Component, ViewChild,OnInit } from '@angular/core';
import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-logged-navbar',
  templateUrl: './logged-navbar.component.html',
  styleUrls: ['./logged-navbar.component.scss']
})
export class LoggedNavbarComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  rolId: number = 0;

  constructor(private router: Router, private cookieService:CookieService) {}
  toggleSidenav() {
    this.sidenav.toggle();
  }
  ngOnInit(): void {
    if(this.cookieService.check('token')){
    }
    else{
      this.router.navigate(['/login']);

    }

      this.rolId = parseInt(this.cookieService.get('rol') || '0', 10);
    
  }
  logout() {
    this.cookieService.delete('token');
    this.cookieService.delete('rol');
    this.router.navigate(['/login']);

  }
}
