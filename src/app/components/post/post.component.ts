import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd } from '@angular/router';
import {Meta, Title} from '@angular/platform-browser';
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
  another_posts: any = [];

  constructor(private activatedRoute:ActivatedRoute,
    private blog_service: BlogService,
    private title_service:Title,
    private meta:Meta) {
      this.title_service.setTitle("Regálalo | Tu regalo ideal");
      this.activatedRoute.params.subscribe(id => {
        this.blog_service.post(id.id)
        .then((response)=> {
          let data = response;
          this.post = data.post;
          this.another_posts = data.another;
          this.title = this.post.title;
          this.featured_image = this.post.featured_image;
          this.content = this.post.content;
          this.author = this.post.author;

          if(this.post.meta_title != ""){
            this.meta.updateTag({
              name: 'title', content: this.post.meta_title
            });
            this.title_service.setTitle(this.post.meta_title);
            this.meta.updateTag({
              property: 'og:title', content: this.post.meta_title
            });
            this.meta.updateTag({
              property: 'og:image', content: this.featured_image
            });
          }
          if(this.post.meta_description != ""){
            this.meta.updateTag({
              name: 'description', content: this.post.meta_description
            });
            this.meta.updateTag({
              property: 'og:description', content: this.post.meta_description
            });
          }
          if(this.post.meta_keywords != ""){
            this.meta.updateTag({
              name: 'keywords', content: this.post.meta_keywords
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
