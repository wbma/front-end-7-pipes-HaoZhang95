import {Component, OnInit} from '@angular/core';
import {MediaService} from '../services/media.service';
import {Media} from '../interfaces/media';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {

  file: File;
  media: Media = {
    title: '',
    description: '',
  };

  constructor(private mediaService: MediaService) { }

  setFile(evt) {
    this.file = evt.target.files[0];
    console.log(evt.target.files[0]);
  }

  startUpload() {

    console.log(this.media);
    // create FormData-object
    const formData = new FormData();

    // add title and description to FormData object
    formData.append('title', this.media.title);
    formData.append('description', this.media.description);

    // add file to FormData object
    formData.append('file', this.file);

    // send FormData object to API
    this.mediaService.upload(formData).subscribe(response => {
      console.log(response);
    });
  }

  ngOnInit() {
  }

}
