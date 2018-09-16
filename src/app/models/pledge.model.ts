import * as firebase from "firebase";

export class Pledge {
  id?: string;
  createdOn: any;
  updatedOn: any;
  amountCents: number;
  property_id: string;
  reward: firebase.firestore.DocumentReference;
  user_id: string;
  property: {};
}
