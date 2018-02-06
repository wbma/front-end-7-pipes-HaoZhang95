import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class MediaService {

  public username: string;
  public password: string;
  public status: string;
  public apiUrl = 'http://media.mw.metropolia.fi/wbma';
  public mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

  constructor(private http: HttpClient, private router: Router) { }

  login() {

    const body = {
      username: this.username,
      password: this.password,
    };

    const settings = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };

    return this.http.post(this.apiUrl + '/login', body, settings).subscribe(data => {
      console.log(data['token']);
      // save token to localStorage
      localStorage.setItem('token', data['token']);
      this.router.navigate(['front']);
    }, (error: HttpErrorResponse) => {
      this.status = error.error.message;
    });
  }

  register(user) {
    // do something here
    console.log(user);
    return this.http.post(this.apiUrl + '/users', user);
  }

  getUserData() {
    const settings = {
      headers: new HttpHeaders().set('x-access-token',
        localStorage.getItem('token')),
    };

    return this.http.get(this.apiUrl + '/users/user', settings);
  }

  upload(formData) {
    const settings = {
      headers: new HttpHeaders().set('x-access-token',
        localStorage.getItem('token')),
    };
    return this.http.post(this.apiUrl + '/media', formData, settings);
  }

  getNewFiles() {
    const startPage = 1;
    const perPage = 10;
    console.log(this.apiUrl + '/media?start=' + startPage + '&limit=' + perPage);
    return this.http.get(this.apiUrl + '/media?start=' + startPage + '&limit=' + perPage);
  }

}


