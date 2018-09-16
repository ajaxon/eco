import { Injectable } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private storage: AngularFireStorage) { }


  getFile(path: string): Observable<any> {
    return this.storage.ref(path).getDownloadURL();
  }

}
