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
  title: string;
  featured_image: string;
  content;
  author: string;

  constructor(private activatedRoute:ActivatedRoute,
    private blog_service: BlogService,
    private meta:Meta) {
      this.activatedRoute.params.subscribe(id => {
        this.blog_service.post(id.id)
        .then((response)=> {
          this.post = response;
          this.title = this.post.title;
          this.featured_image = this.post.featured_image;
          this.content = this.post.content;
          this.author = this.post.author;

          if(response.meta_title != ""){
            this.meta.updateTag({
              name: 'title', content: response.meta_title
            });
            this.meta.updateTag({
              property: 'og:title', content: response.meta_title
            });
            this.meta.updateTag({
              property: 'og:image', content: this.featured_image
            });
          }
          if(response.meta_description != ""){
            this.meta.updateTag({
              name: 'description', content: response.meta_description
            });
            this.meta.updateTag({
              property: 'og:description', content: response.meta_description
            });
          }
          if(response.meta_keywords != ""){
            this.meta.updateTag({
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
