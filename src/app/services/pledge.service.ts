



import { Injectable } from '@angular/core';

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import {Observable} from 'rxjs';
import * as firebase from 'firebase/app';
import {Pledge} from '../properties/models/pledge.model';
import {Property, Reward} from "../properties/models/property.model";

@Injectable()
export class PledgeService {

  pledgesCollectionRef: AngularFirestoreCollection<any>;

  properties$: Observable<any[]>;


  constructor(private fireStore: AngularFirestore) {
    this.pledgesCollectionRef = this.fireStore.collection<any>('pledges');


  }

  getUserPledges(user: User) {

    const userRef = this.fireStore.collection('users').doc(user.uid).ref;

    console.log("USER REF ", userRef);
    return this.fireStore.collection('pledges', ref => ref.where('user', '==', userRef)).valueChanges();
  }

  getRewardPledges(reward: Reward) {

    return this.fireStore.collection('pledges', ref => ref.where('reward', '==', true));
  }

  addPledge(reward: Reward, pledge: Pledge) {

    const ref = this.fireStore.collection('pledges');
    pledge.createdAt = this.timestamp;
  }

  updateProperty(property: Property) {
    this.fireStore.collection('properties').doc(property.id)
      .update(property)
      .then(() => console.log('Updated'));
  }


  deleteProperty(pledge: Pledge) {
    this.pledgesCollectionRef.doc(pledge.id).delete();
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
    // this.propertiesCollectionRef.doc(property.id).collection('rewards').add(reward);
  }

  get timestamp(){
    return firebase.firestore.FieldValue.serverTimestamp();
  }


}
