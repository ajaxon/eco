



import { Injectable } from '@angular/core';

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import {Observable} from 'rxjs';
import * as firebase from 'firebase/app';
import { Property, Reward } from '../../models/property.model';

@Injectable()
export class PropertyService {

  propertiesCollectionRef: AngularFirestoreCollection<Property>;

  properties$: Observable<any[]>;


  constructor(private fireStore: AngularFirestore) {
    this.propertiesCollectionRef = this.getProperties();
    this.properties$ = this.propertiesCollectionRef.snapshotChanges().map(actions => {
      return actions.map(action => {
          const data = action.payload.doc.data() as Property;
          const id = action.payload.doc.id;
          return { id, ...data};
      });
    });

  }

  getProperties() {
     return this.fireStore.collection<Property>('properties', ref => ref.where('published', '==', true));
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

  deleteReward(reward: Reward){
    this.propertiesCollectionRef.doc(reward.propertyId).collection('rewards').doc(reward.id).delete();
  }
  get timestamp(){
    return firebase.firestore.FieldValue.serverTimestamp();
  }


}
