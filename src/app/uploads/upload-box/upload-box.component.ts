import { Component, OnInit, Input } from '@angular/core';
import {
  AngularFireStorage,
  AngularFireUploadTask
} from 'angularfire2/storage';
import { AngularFirestore } from 'angularfire2/firestore';
import { tap, finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

@Component({
  selector: 'upload-box',
  templateUrl: './upload-box.component.html',
  styleUrls: ['./update-box.component.scss']
})
export class UploadBoxComponent implements OnInit {

  @Input() directory: string;
  @Input() type: string;

  task: AngularFireUploadTask;

  // Progress monitoring
  percentage: Observable<number>;

  snapshot: Observable<any>;

  // Download URL
  downloadURL: Observable<string>;

  // State for dropzone CSS toggling
  isHovering: boolean;

  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore
  ) {}

  ngOnInit() {
  }


  toggleHover(event: boolean) {
    
    this.isHovering = event;
  }

  startUpload(event: FileList) {
    const user = firebase.auth().currentUser;

    // The File object
    const file = event.item(0);
    // Client-side validation example
    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type :( ');
      return;
    }

    // The storage path
    let path;
    if(this.type === 'default'){
       path = `${this.directory}/${user.uid}/default`;
    } else {
     path = `${this.directory}/${user.uid}/${file.name}`;
    }
    // Totally optional metadata
    const customMetadata = { app: 'My AngularFire-powered PWA!' };

    // The main task
    this.task = this.storage.upload(path, file, { customMetadata });

    // Progress monitoring
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges().pipe(
      tap(snap => {
        if (snap.bytesTransferred === snap.totalBytes) {
          // Update firestore on completion
          //this.db.collection('photos').add({ path, size: snap.totalBytes });
          console.log("Image url", snap.ref.getDownloadURL());
          this.db.collection('profiles').doc(user.uid).update({
            photos: [{path, size: snap.totalBytes}]
          });
        }
      }),
      finalize(() => this.downloadURL = this.storage.ref(path).getDownloadURL() )
    );


    // The file's download URL
  }

  // Determines if the upload task is active
  isActive(snapshot) {
    return (
      snapshot.state === 'running' &&
      snapshot.bytesTransferred < snapshot.totalBytes
    );
  }
}
