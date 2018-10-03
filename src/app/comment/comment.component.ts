import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import * as jwt_decode from "jwt-decode";


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

 
  user = [];
  userId = '';
  updateUser = null;
  articleId='';
  article=[];
  comments=[];

  constructor(private router: Router, private apiService: ApiService, private route: ActivatedRoute) {
  //   this.route.params.subscribe(params => {
  //     this.articleId = params.idArticle; //idArticle se trouve dans path (app.module.ts)
  //    console.log(this.articleId);
  //  })
  }

  ngOnInit() {
    
    this.apiService.getArticle().subscribe(res => {
      console.log(res.json());
      this.article = res.json(); //get article by id
    });
    //console.log(this.articleId);
    this.apiService.getcomment().subscribe(res => {
      console.log(res.json());
      this.comments = res.json(); //get article by id
    });

  }
 
  deletecomment(id) {
    if (confirm('Are you sur to delete this comment ?') == true) {
      this.apiService.deletecomment(id).subscribe(res => {
        this.ngOnInit();
      })
    }
  }
  

  logoutBtn() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }


}
