import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  signinForm: FormGroup;
  registerForm: FormGroup;
  loading_login:boolean = false;
  loading_register:boolean = false;

  constructor( private router: Router,
    private auth: AuthService) { }

  ngOnInit() {
    this.signinForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

    this.registerForm = new FormGroup({
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  login(){
    this.loading_login = true;
    const loginData = this.signinForm.value;
    this.auth.login(loginData)
      .then((response) => {
        this.loading_login = false;
        let status = response.json().status;
        if(status == "ok"){
          localStorage.setItem('token', response.json().token);
          this.signinForm.reset();
          this.auth.setLogin();
          this.router.navigate(['/profile']);
        }
        if(status == "error"){
          let error_message = response.json().message;
          alert(error_message);
        }
      })
      .catch((error) => {
        this.loading_login = false;
        alert("Ocurrió un error, inténtalo de nuevo.");
    })
  }

  register(){
    this.loading_register = true;
    const registerData = this.registerForm.value;
    this.auth.register(registerData)
      .then((response) => {
        this.loading_register = false;
        let status = response.json().status;
        if(status == "ok"){
          localStorage.setItem('token', response.json().token);
          this.registerForm.reset();
          this.router.navigate(['/profile']);
        }
        if(status == "error"){
          let error_message = response.json().message;
          alert(error_message);
        }
      })
      .catch((error) => {
        this.loading_register = false;
        alert("Ocurrió un error, inténtalo de nuevo.");
      });
  }

}
