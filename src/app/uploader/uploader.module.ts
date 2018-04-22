import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StorageService} from "./storage.service";
import {UploadFormComponent} from "./upload-form/upload-form.component";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [UploadFormComponent],
  providers: [StorageService],
  exports: [UploadFormComponent]
})
export class UploaderModule { }
