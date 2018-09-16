import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadPageComponent } from './upload-page/upload-page.component';
import { DropZoneDirective } from './drop-zone.directive';
import { FileSizePipe } from './file-size.pipe';
import { UploadBoxComponent } from './upload-box/upload-box.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [UploadPageComponent, DropZoneDirective, FileSizePipe, UploadBoxComponent],
  exports: [UploadBoxComponent]
})
export class UploadsModule { }
