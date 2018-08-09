import { Component, OnInit } from '@angular/core';
import { BlogService } from './../../services/blog.service';
import swal from 'sweetalert2';
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  posts: any;

  constructor(private meta:Meta,
    private title_service:Title,
    private blog_service: BlogService) {
    this.getPosts();
    this.title_service.setTitle("Regálalo | Tu regalo ideal");
  }

  ngOnInit() {
  }

  getPosts(){
    this.blog_service.posts().then((response) => {
        this.posts = response;
      }).catch((error) => {
        swal("Error", "Ocurrió un error, inténtalo de nuevo.", "error");
    })
  }

}
