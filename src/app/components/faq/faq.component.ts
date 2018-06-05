import { Component, OnInit } from '@angular/core';

import { FaqService } from './../../services/faq.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  faqs:any;

  constructor(private faq_service: FaqService) {
    this.getFaqs();
  }

  ngOnInit() {
    
  }

  getFaqs(){
    this.faq_service.get()
    .then((response) => {
      response = response;
      this.faqs = response.faq;
    })
    .catch((error) => {
      swal("Error", "Ocurrió un error, inténtalo de nuevo.", "error");
    });
  }

}
