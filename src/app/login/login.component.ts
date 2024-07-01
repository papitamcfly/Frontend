import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../prueba/user.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private userService: UserService,private router:Router,private cookieService: CookieService) {
    this.loginForm = new FormGroup({
      uid: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }
  ngOnInit(): void {
    if(this.cookieService.check('token')){
      this.router.navigate(['/Dashboard']);
    }
    else{
    }
}
  onSubmit() {
    console.log(this.loginForm)
    if (this.loginForm.valid) {
      this.userService.Login(this.loginForm.value).subscribe(
        response => {
          console.log('User registered successfully', response);
          let token = response.token.token
          this.cookieService.set('token', response.token.token, { expires: 1, path: '/' });
          this.cookieService.set('rol', response.user.role_id, { expires: 1, path: '/' });

          this.router.navigate(['/Dashboard']);
        },
        error => {
          console.error('Error login user', error);
          alert('Error, verifique las credenciales')
        }
      );
    }
  }
}
