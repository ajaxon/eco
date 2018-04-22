import * as firebase from "firebase";

export class Pledge {
  id?: string;
  createdAt: any;
  amountCents: number;
  reward: firebase.firestore.DocumentReference;
  user: firebase.firestore.DocumentReference;
}
