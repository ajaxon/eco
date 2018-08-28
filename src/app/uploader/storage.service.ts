import {Injectable} from '@angular/core';
import {FirebaseListObservable} from 'angularfire2/database-deprecated';
import * as firebase from 'firebase';
import {Upload} from "./upload";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import UploadTaskSnapshot = firebase.storage.UploadTaskSnapshot;

@Injectable()
export class StorageService {
  constructor(private db: AngularFirestore) { }
  private basePath = '/uploads';
  uploads: FirebaseListObservable<Upload[]>;


  pushUpload(upload: Upload, basePath?: String) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot: UploadTaskSnapshot) =>  {
        // upload-form in progress
        upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        // upload-form failed
        console.log(error);
      },
      () => {
        // upload-form success
        upload.url = uploadTask.snapshot.downloadURL;
        upload.name = upload.file.name;
        this.saveFileData(upload);
      }
    );
  }

  // Delete a file
  delete(upload: Upload) {
    /* this.deleteFileData(upload.$key)
      .then( () => {
        this.deleteFileStorage(upload.name);
      })
      .catch(error => console.log(error));

      */
  }
  // Deletes the file details from the realtime db
  private deleteFileData(key: string) {
    //return this.db.list(`${this.basePath}/`).remove(key);
  }
  // Firebase files must have unique names in their respective storage dir
  // So the name serves as a unique key
  private deleteFileStorage(name:string) {
    let storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${name}`).delete()
  }
  // Writes the file details to the realtime db
  private saveFileData(upload: Upload) {
    //this.db.list(`${this.basePath}/`).push(upload);
  }
}
