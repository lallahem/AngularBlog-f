import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as jwt_decode from "jwt-decode";
import { ApiService } from '../api.service';


@Component({
  selector: 'app-menu', 
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
name = '';
user =[];
constructor(private router: Router, private apiService: ApiService) {
  
 }

  ngOnInit() {
    const token = localStorage.getItem('token');
    let Data = jwt_decode(token).data;
    console.log( Data)
    this.user=Data
    console.log(this.user)
  
   //this.apiService.getUser().subscribe(res => {
   // this.name = res.json();
    
  //})
  }

  
  logoutBtn() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  AddBtn() {
    this.router.navigateByUrl('/Add');
      
  }
}
