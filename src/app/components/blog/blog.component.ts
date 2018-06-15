import { Component, OnInit } from '@angular/core';
import { BlogService } from './../../services/blog.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  posts: any;

  constructor(private blog_service: BlogService) {
    this.getPosts();
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
