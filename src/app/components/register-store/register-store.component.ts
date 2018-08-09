import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { AuthService } from './../../services/auth.service';
declare const App: any;
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-register-store',
  templateUrl: './register-store.component.html',
  styleUrls: ['./register-store.component.scss']
})
export class RegisterStoreComponent implements OnInit {

  step_1_Form: FormGroup;
  step_2_Form: FormGroup;
  step_3_Form: FormGroup;
  step_4_Form: FormGroup;
  loading:boolean = false;

  constructor(private router: Router,
    private title_service:Title,
    private auth: AuthService) {
      this.title_service.setTitle("Regálalo | Tu regalo ideal");
  }

  ngOnInit() {
    this.step_1_Form = new FormGroup({
      business_name: new FormControl('', Validators.required),
      comercial_name: new FormControl('', Validators.required),
      ruc: new FormControl('', Validators.required),
      legal_address: new FormControl('', Validators.required),
      business_turn: new FormControl('', Validators.required)
    });

    this.step_2_Form = new FormGroup({
      name: new FormControl('', Validators.required),
      document_number: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required)
    });

    this.step_3_Form = new FormGroup({
      name: new FormControl('', Validators.required),
      document_number: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required)
    });

    this.step_4_Form = new FormGroup({
      message: new FormControl('')
    });
  }

  ngAfterViewInit() {
    if (!!App && App.hasOwnProperty('MultiStepForm')) {
      App.MultiStepForm();
    }
  }

  register_store(){
    this.loading = true;
    const storeData = this.step_1_Form.value;
    const legalRepresentativeData = this.step_2_Form.value;
    const comercialContactData = this.step_3_Form.value;
    const messageData = this.step_4_Form.value;
    const registerData = {};
    registerData["store"] = storeData;
    registerData["legal_representative"] = legalRepresentativeData;
    registerData["comercial_contact"] = comercialContactData;
    registerData["message"] = messageData;

    this.auth.register_store(registerData)
      .then((response) => {
        this.loading = false;
        response = response.json();
        swal("¡Éxito!", "Se ha registrado la tienda con éxito, muy pronto estaremos en contacto con usted.", "success");
        this.step_1_Form.reset();
        this.step_2_Form.reset();
        this.step_3_Form.reset();
        this.step_4_Form.reset();
        window.location.href = "/";
      })
      .catch((error) => {
        this.loading = false;
        swal("Error", "Ocurrió un error, inténtalo de nuevo.", "error");
      });
  }

}
