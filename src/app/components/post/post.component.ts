import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd } from '@angular/router';
import {Meta} from '@angular/platform-browser';
import { BlogService } from './../../services/blog.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  post: any;

  constructor(private activatedRoute:ActivatedRoute,
    private blog_service: BlogService,
    private meta:Meta) {
      this.activatedRoute.params.subscribe(id => {
        this.blog_service.post(id.id)
        .then((response)=> {
          this.post = response;

          if(response.meta_title !== ""){
            this.meta.addTag({
              name: 'title', content: response.meta_title
            });
          }
          if(response.meta_description !== ""){
            this.meta.addTag({
              name: 'description', content: response.meta_description
            });
          }
          if(response.meta_keywords !== ""){
            this.meta.addTag({
              name: 'keywords', content: response.meta_keywords
            });
          }
          
        })
        .catch((error) => {
          swal("Error", "Ocurrió un error, inténtalo de nuevo.", "error");
        })
      });

      
    }

  ngOnInit() {
  }

}
