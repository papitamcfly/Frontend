// prueba.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.scss']
})
export class PruebaComponent {
  registerForm: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private recaptchaV3Service: ReCaptchaV3Service
  ) {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
      nickname: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required, Validators.min(18)]),
      birthdate: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.recaptchaV3Service.execute('register').subscribe((token) => {
        this.userService.Register(this.registerForm.value, token).subscribe(
          response => {
            console.log('User registered successfully', response);
            this.router.navigate(['/login']);
          },
          error => {
            console.error('Error registering user', error);
          }
        );
      });
    }
  }
}
