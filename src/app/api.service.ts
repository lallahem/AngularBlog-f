import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: Http, private socket: Socket) { }

  loginApi(form) {
    return this.http.post('http://localhost:3000/auth/login', form);
  }

  registerApi(form) {
    return this.http.post('http://localhost:3000/auth/register', form);
  }
  getArticle() {
    return this.http.get('http://localhost:3000/blog/article');
  }
  postArticle(form) {
    return this.http.post('http://localhost:3000/blog/article', form);
  }
  deleteArticle(id) {
    return this.http.delete('http://localhost:3000/blog/article/' + id);
  }
  editArticle(id, article) {
    console.log(article)
    return this.http.put('http://localhost:3000/blog/article/' + id, article);
  }
  getarticleById(id) {
    return this.http.get(`http://localhost:3000/blog/article/${id}`)
  }
  getUser() {
    return this.http.get('http://localhost:3000/auth/register');
  }
  postUser(form) {
    return this.http.post('http://localhost:3000/auth/register', form);
  }
  deleteUser(id) {
    return this.http.delete('http://localhost:3000/auth/register/' + id);
  }
  updateUser(id, user) {
    return this.http.put('http://localhost:3000/auth/register/' + id, user);
  }
  getcomment() {
    return this.http.get('http://localhost:3000/blog/comment');
  }
  postcomment(id, form) {
    return this.http.post('http://localhost:3000/blog/comment/' + id, form);
  }
  deletecomment(id) {
    return this.http.delete('http://localhost:3000/blog/comment/' + id);
  }

  newArticle() {
    return this.socket
      .fromEvent("newarticle")
  }
}
