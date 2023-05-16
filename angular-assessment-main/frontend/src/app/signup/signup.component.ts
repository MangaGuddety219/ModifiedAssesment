import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  email:string='';
  password:string='';

  constructor(public authService:AuthService) { }
  submitted=false;
  RegisterForm = new FormGroup({
    Username: new FormControl('', [Validators.required]),
    Name:new FormControl('',[Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  ngOnInit(): void {
  }
  register(){
    this.submitted=true;
    const registerData=this.RegisterForm.value;
    console.log(registerData);
    this.authService.createUser(registerData.Username!,registerData.password!,registerData.Name!)
    // this.authService.register(registerData.email,registerData.password);

  }


}
