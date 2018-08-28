
import {firestore} from "firebase";


export class Property {

  id?: string;
  title: string;
  description: string;
  parcelSize: string;
  location: any;
  pledgeCount: number;
  priceCents: number;
  published: boolean;
  status: string = 'pending';
  terrains: any;
  totalPledged: string;

  createdAt: any;

}


export class Reward {
  id?: string;
  description: string;
  propertyId: string;
  maxPledges: number;
  pledgeAmountCents: number;
  pledgeCount: number;
}
