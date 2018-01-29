import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class MediaService {

  public username: string;
  public password: string;
  apiUrl = 'http://media.mw.metropolia.fi/wbma';

  constructor(private http: HttpClient) { }

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
    });
  }

  register() {
    // do something here
    console.log('uname: ' + this.username);
    console.log('pwd: ' + this.password);
  }

}



