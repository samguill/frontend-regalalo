import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Meta} from '@angular/platform-browser';

import { PageService } from './../../services/page.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  page:any;

  constructor(private activatedRoute:ActivatedRoute,
    private meta:Meta,
    private page_service:PageService) {
      this.activatedRoute.params.subscribe(id => {
        this.page_service.page(id.id)
        .then((response)=> {
          if(response.status == "ok"){
            this.page = response.page;
          }
        })
        .catch((error)=> {
          swal("Error", "Ocurrió un error, inténtalo de nuevo.", "error");
        })
      });
    }

  ngOnInit() {
  }

}
