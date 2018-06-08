import { Component, OnInit } from '@angular/core';
import { PageService } from './../../../services/page.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  pages: any;
  servicios: any;
  ventas:any;
  constructor(private pageService: PageService) {
    this.pageService.pages()
      .then((response)=> {
        response = response.json();
        if(response.status == "ok"){
          this.servicios = response.pages.filter(it => it["position"] == "footer-servicio-cliente");
          this.ventas = response.pages.filter(it => it["position"] == "footer-venta-compra");
        }
      })
      .catch((error)=> {
        this.pages = [];
      })
  }

  ngOnInit() {
    
  }

}
