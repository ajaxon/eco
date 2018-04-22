import { Component } from '@angular/core';


import {Upload} from "../upload";
import {StorageService} from "../storage.service";

@Component({
  selector: 'upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: [],
})
export class UploadFormComponent {

  selectedFiles: FileList | null;
  currentUpload: Upload;

  constructor(private upSvc: StorageService) { }

  detectFiles($event: Event) {
    this.selectedFiles = ($event.target as HTMLInputElement).files;
  }

  uploadSingle() {
    const file = this.selectedFiles;
    if (file && file.length === 1) {
      this.currentUpload = new Upload(file.item(0));
      this.upSvc.pushUpload(this.currentUpload);
    } else {
      console.error('No file found!');
    }
  }

  uploadMulti() {
    const files = this.selectedFiles;
    if (!files || files.length === 0) {
      console.error('No Multi Files found!');
      return;
    }

    Array.from(files).forEach((file) => {
      this.currentUpload = new Upload(file);
      this.upSvc.pushUpload(this.currentUpload);
    });
  }
}
