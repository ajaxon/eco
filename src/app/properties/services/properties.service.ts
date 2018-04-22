



import { Injectable } from '@angular/core';

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import {Observable} from 'rxjs';
import {Property, Reward} from '../models/property.model';
import * as firebase from 'firebase/app';
import {StorageService} from '../../uploader/storage.service';

@Injectable()
export class PropertyService {

  propertiesCollectionRef: AngularFirestoreCollection<any>;

  properties$: Observable<any[]>;


  constructor(private fireStore: AngularFirestore, private storageService: StorageService) {
    this.propertiesCollectionRef = this.fireStore.collection<any>('properties');
    this.properties$ = this.propertiesCollectionRef.snapshotChanges().map(actions => {
      return actions.map(action => {
          const data = action.payload.doc.data() as Property;
          const id = action.payload.doc.id;
          return { id, ...data};
      });
    });

  }

  getProperties() {

     return this.fireStore.collection('properties', ref => ref.where('published', '==', true));
  }

  addProperty(property: Property, files?: any) {

    property.createdAt = this.timestamp;
    this.propertiesCollectionRef.add(property);
  }

  updateProperty(property: Property) {
    this.fireStore.collection('properties').doc(property.id)
      .update(property)
      .then(() => console.log('Updated'));
  }


  deleteProperty(property: Property) {
    this.propertiesCollectionRef.doc(property.id).delete();
  }

  getRewards(property: Property) {
    return this.fireStore.collection<Reward>('properties').doc(property.id).collection('rewards').snapshotChanges().map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as Reward;
        const id = action.payload.doc.id;
        return { id, ...data};
      });
    });
  }

  addReward(property: Property, reward: Reward) {
    this.propertiesCollectionRef.doc(property.id).collection('rewards').add(reward);
  }

  get timestamp(){
    return firebase.firestore.FieldValue.serverTimestamp();
  }


}
