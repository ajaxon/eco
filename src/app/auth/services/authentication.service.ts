import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import {BehaviorSubject, Subject} from "rxjs/Rx";

interface User {
  uid: string;
  email?: string | null;
  photoURL?: string;
  displayName?: string;
  admin?: boolean;
}

@Injectable()
export class AuthenticationService {

  user: Observable<User | null>;
  admin = new BehaviorSubject(false);
  isAdmin$ = this.admin.asObservable();

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router, ) {

    this.user = this.afAuth.authState
      .switchMap((user) => {
        if (user) {
          this.setAdmin();
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();

        } else {
          return Observable.of(null);
        }
      });
  }

  ////// OAuth Methods /////

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  githubLogin() {
    const provider = new firebase.auth.GithubAuthProvider();
    return this.oAuthLogin(provider);
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.oAuthLogin(provider);
  }

  twitterLogin() {
    const provider = new firebase.auth.TwitterAuthProvider();
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider: firebase.auth.AuthProvider) {
    console.log('Oauthlogin');
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        //this.notify.update('Welcome to Firestarter!!!', 'success');
        this.setAdmin();
        this.router.navigate(['/']);
        return this.updateUserData(credential.user);
      })
      .catch((error) =>
        this.handleError(error) );
  }

  //// Anonymous Auth ////

  anonymousLogin() {
    return this.afAuth.auth.signInAnonymously()
      .then((user) => {
        //this.notify.update('Welcome to Firestarter!!!', 'success');
        return this.updateUserData(user.user); // if using firestore
      })
      .catch((error) => {
        console.error(error.code);
        console.error(error.message);
        this.handleError(error);
      });
  }

  //// Email/Password Auth ////

  emailSignUp(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        //this.notify.update('Welcome to Firestarter!!!', 'success');
        return this.updateUserData(user.user); // if using firestore
      })
      .catch((error) => this.handleError(error) );
  }

  emailLogin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        //this.notify.update('Welcome to Firestarter!!!', 'success');
        return this.updateUserData(user.user); // if using firestore
      })
      .catch((error) => this.handleError(error) );
  }

  // Sends email allowing user to reset password
  resetPassword(email: string) {
    const fbAuth = firebase.auth();

    return fbAuth.sendPasswordResetEmail(email)
      .then(() => console.log('Reset'))//this.notify.update('Password update email sent', 'info'))
      .catch((error) => this.handleError(error));
  }

  logout() {
    this.afAuth.auth.signOut().then(() => {
      this.setAdmin();
      this.router.navigate(['/']);
    });
  }

  // If error, console log and notify user
  private handleError(error: any) {
    console.error('Error ', error);
    /*
    if (error.code === 'auth/account-exists-with-different-credential') {
      console.log('Duplicate user');
      const existingEmail = error.email;
      const pendingCred = error.credential;
      // Lookup existing account’s provider ID.
      return firebase.auth().fetchProvidersForEmail(error.email)
        .then( (providers) => {
          if (providers.indexOf(firebase.auth.EmailAuthProvider.PROVIDER_ID) !== -1) {
            // Password account already exists with the same email.
            // Ask user to provide password associated with that account.
            const password = window.prompt('Please provide the password for ' + existingEmail);
            if (password) {
              return firebase.auth().signInWithEmailAndPassword(existingEmail, password);
            }
          } else if (providers.indexOf(firebase.auth.GoogleAuthProvider.PROVIDER_ID) !== -1) {
            console.log('Linked Google');
            const googProvider = new firebase.auth.GoogleAuthProvider();
            // Sign in user to Google with same account.
            googProvider.setCustomParameters({'login_hint': existingEmail});
            return firebase.auth().signInWithRedirect(googProvider).then(function(result) {
              return result;
            });
          } else {

          }
        })
        .then(user => {
          // Existing email/password or Google user signed in.
          // Link Facebook OAuth credential to existing account.
          return user.linkWithCredential(pendingCred);
        });

        */
    //}

    //this.notify.update(error.message, 'error');
  }

  // Sets user data to firestore after succesful login
  private updateUserData(user: User) {

    console.log('User ', user);
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email || null,
      displayName: user.displayName || 'nameless user',
      photoURL: user.photoURL || 'https://goo.gl/Fz9nrQ',
    };
    return userRef.set(data);
  }

  isAdmin() {




  }
  setAdmin(): void {
    firebase.auth().currentUser.getIdTokenResult()
      .then((idTokenResult) => {
        // Confirm the user is an Admin.
        if (!!idTokenResult.claims.admin) {
          // Show admin UI.
          console.log("Setting Admin to True");
          this.admin.next(true);
        } else {
          // Show regular user UI.
          console.log("Setting Admin to False");
          this.admin.next(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

}
