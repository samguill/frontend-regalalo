import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import swal from 'sweetalert2';
import { ContactService } from './../../services/contact.service';
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contactForm: FormGroup;
  loading:boolean = false;

  constructor(private contact: ContactService,
    private title_service:Title) { }

  ngOnInit() {
    this.contactForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required)
    });
  }

  sendMessage(){
    this.loading = true;
    const contactData = this.contactForm.value;
    this.contact.send_message(contactData)
      .then((response) => {
        this.loading = false;
        response = response.json();
        if(response.status === "ok"){
          swal("Éxito", "Tu consulta ha sido enviada con éxito, en breve nos comunicacremos contigo.", "success");
        }
        this.contactForm.reset();
      })
      .catch((error) => {
        this.contactForm.reset();
        this.loading = false;
        let message = "Ocurrió un error, inténtalo de nuevo.";
        swal("Error", message, "error");
    })
  }

}
