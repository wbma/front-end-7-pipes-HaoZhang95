import { Component, OnInit } from '@angular/core';
import { MediaService } from '../services/media.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-front',
  templateUrl: './front.component.html',
  styleUrls: ['./front.component.scss']
})
export class FrontComponent implements OnInit {

  public files: any = [];

  constructor(private mediaService: MediaService, private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('token') !== null) {
      this.mediaService.getUserData().subscribe(response => {
        console.log('Welcome, Hello ' + response['full_name']);
      }, (error: HttpErrorResponse) => {
        console.log(error);
        this.router.navigate(['login']);
      });
    } else {
      this.router.navigate(['login']);
    }

    // get 10 latest media files
    this.mediaService.getNewFiles().subscribe(data => {
       console.log(data);
       this.files = data;
       this.files.map(media => {
         const thumbName = media.filename.split('.')[0] + '-tn320.png';
         media.thumbnail = thumbName;
       });
       console.log(this.files);
     });
  }


}
