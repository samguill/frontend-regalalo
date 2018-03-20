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
  loading:boolean = false;

  constructor( private router: Router,
    private auth: AuthService) { }

  ngOnInit() {
    this.signinForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  login(){
    this.loading = true;
    const loginData = this.signinForm.value;
    this.auth.login(loginData)
      .then((response) => {
        this.loading = false;
        console.log(response);
      })
      .catch((error) => {
        this.loading = false;
        alert("Ocurrió un error, inténtalo de nuevo.");
    })
  }

}
