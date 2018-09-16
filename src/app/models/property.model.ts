
import {firestore} from "firebase";
import { Address } from "./address.model";


export class Property {

  id?: string;
  title: string;
  description: string;
  parcelSize: string;
  location?: {
    state?: string;
    city?: string;
    postalCode?: string;
    geo: firebase.firestore.GeoPoint;
  };
  pledges: {
    count: number;
    total: number;

  };
  priceCents: number;
  published: boolean;
  status = 'pending';
  terrains: any;

  photos?: string[];
  createdAt: any;

  address: Address;

}


export class Reward {
  id?: string;
  description: string;
  propertyId: string;
  maxPledges: number;
  pledgeAmountCents: number;
  pledgeCount: number;
}
