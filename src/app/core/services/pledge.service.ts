



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
import { AuthenticationService } from '../../auth/services/authentication.service';
import { AngularFireAuth } from 'angularfire2/auth';


@Injectable()
export class PledgeService {

  pledgesCollectionRef: AngularFirestoreCollection<Pledge>;

  pledges: Observable<any[]>;
  userId: string;

  constructor(private afAuth: AngularFireAuth, private fireStore: AngularFirestore, private auth: AuthenticationService) {
    this.pledgesCollectionRef = this.fireStore.collection<Pledge>('pledges');


    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
    }});

  }

  /*
  Get all pledges made by user currently logged in
   */
  getUserPledges(): Observable<Pledge[]> {

    return this.afAuth.authState.flatMap(user => {
      if (user) {
        return this.fireStore.collection<Pledge>('pledges', ref => ref.where('user_id', '==', user.uid))
        .snapshotChanges().map(actions => {
         return actions.map(action => {
          const data = action.payload.doc.data() as Pledge;
          const id = action.payload.doc.id;
          return { id, ...data};
        });
      });



    } else {
      return;
    }});


  }

  /*
  Get all pledges for a given reward
   */
  getRewardPledges(reward: Reward) {

    return this.fireStore.collection('pledges', ref => ref.where('reward', '==', true));
  }

  addPledge(pledge: Pledge) {
    const user = firebase.auth().currentUser;

    const ref = this.fireStore.collection('pledges');
    pledge.createdOn = this.timestamp;
    
    ref.add(pledge);
  }



  deletePledge(pledge: Pledge) {
    this.pledgesCollectionRef.doc(pledge.id).delete();
  }

  getRewards(property: Property): Observable<Reward[]> {
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
