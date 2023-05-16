import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email:string='';
  password:string='';

  constructor(public authService:AuthService,private router:Router) { }
  submitted=false;
  LoginForm = new FormGroup({
    Username: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });


  ngOnInit(): void {
  }
  login(){
    this.submitted=true;
    const loginData = this.LoginForm.value;

    this.authService.login(loginData.Username!,loginData.password!)


  }

}
