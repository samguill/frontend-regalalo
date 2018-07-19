import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { AuthService } from './../../services/auth.service';
import { UserNameService } from './../../services/user-name.service';
import { Location } from '@angular/common';

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
    private auth: AuthService,
    private user_name_service:UserNameService,
    private location:Location) { }

  ngOnInit() {
    this.signinForm = new FormGroup({
      username: new FormControl('', Validators.required),
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
        response = response.json();
        this.user_name_service.sendData(response.client.first_name);
        sessionStorage.setItem('access_token', response.access_token);
        sessionStorage.setItem('refresh_token', response.refresh_token);
        sessionStorage.setItem('client', JSON.stringify(response.client));
        this.signinForm.reset();
        this.auth.setLogin();
        this.location.back();
        //this.router.navigate(['/mi-cuenta']);
      })
      .catch((error) => {
        this.loading_login = false;
        let message = "Ocurrió un error, inténtalo de nuevo.";
        if(error.json().error == "invalid_credentials"){
          message = "Los datos ingresados son incorrectos";
        }
        swal("Error", message, "error");
    })
  }

  register(){
    this.loading_register = true;
    const registerData = this.registerForm.value;
    this.auth.register(registerData)
      .then((response) => {
        this.loading_register = false;
        response = response.json();
        //sessionStorage.setItem('access_token', response.access_token);
        //sessionStorage.setItem('refresh_token', response.refresh_token);
        //sessionStorage.setItem('client', JSON.stringify(response.client));
        this.registerForm.reset();
        //this.auth.setLogin();
        //this.router.navigate(['/mi-cuenta']);
      })
      .catch((error) => {
        this.loading_register = false;
        swal("Error", "Ocurrió un error, inténtalo de nuevo.", "error");
      });
  }

}
