import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as jwt_decode from "jwt-decode";


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  addForm: FormGroup;
  user = {};
  userId = '';
  updateUser = null;

  constructor(private router: Router, private apiService: ApiService) {

  }

  ngOnInit() {
    console.log(this.userId);
    this.addForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(3)]),
      lastname: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),

    });
    this.apiService.getUser().subscribe(res => {
      console.log(res.json());
      this.user = res.json();
    })

  }
  addUser() {
    if (this.addForm.valid) {
      this.apiService.postUser(this.addForm.value).subscribe(res => {
        this.ngOnInit();
      });
    }
  }
  deleteUser(id) {
    if (confirm('Are you sur to delete this user ?') == true) {
      this.apiService.deleteUser(id).subscribe(res => {
        this.ngOnInit();
      })
    }
  }
  userToUpdate() {

    this.apiService.updateUser(this.updateUser._id, this.updateUser).subscribe(res => {
      console.log(this.updateUser);
      this.updateUser = null;
      this.ngOnInit();
    })


    /** updateArticle() {
       console.log(this.articleToUpdate);
           this.apiService.editArticle(this.articleToUpdate._id  , this.articleToUpdate).subscribe(res => {
             this.articleToUpdate = null;
             this.ngOnInit();
           })
         
     
       }**/
  }

  logoutBtn() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }



}
