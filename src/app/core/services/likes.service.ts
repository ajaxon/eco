



import { Injectable } from '@angular/core';

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import {Observable} from 'rxjs';
import * as firebase from 'firebase/app';
import { Pledge } from '../../models/pledge.model';
import { Reward, Property } from '../../models/property.model';


export class Like{

}
@Injectable()
export class LikeService {

  pledgesCollectionRef: AngularFirestoreCollection<Pledge>;

  pledges: Observable<any[]>;


  constructor(private fireStore: AngularFirestore) {
    this.pledgesCollectionRef = this.fireStore.collection<Pledge>('pledges');


  }

  /*
  Get all pledges made by user currently logged in
   */
  getUserLikes() {

    const user = firebase.auth().currentUser;
    if( user === null) {
      return;
    }

    //const userRef = this.fireStore.collection('likes').doc(user.uid).ref;
    console.log('User pledges for : ' , user.uid);
    return this.fireStore.collectionGroup<Like>('likes', ref => ref.where('user_id', '==', user.uid)).valueChanges();
  }



  getPropertyLikes() {
    return this.fireStore.collection('properties/likes').valueChanges();
  }
  /*
  Get all pledges for a given reward
   */
  getRewardPledges(reward: Reward) {

    return this.fireStore.collection('pledges', ref => ref.where('reward', '==', true));
  }

  addPledge(pledge: Pledge) {

    const ref = this.fireStore.collection('pledges');
    pledge.createdOn = this.timestamp;
    ref.add(pledge);
  }



  deletePledge(pledge: Pledge) {
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
