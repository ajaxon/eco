
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

import * as  functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);

const SEND_GRID_APIKEY = functions.config().sendgrid.key;
const sg_mail = require('@sendgrid/mail');
sg_mail.setApiKey(SEND_GRID_APIKEY);

// On Pledge Create
exports.createUser = functions.firestore
  .document('pledges/{pledgeId}')
  .onCreate((snap, context) => {
  // Get an object representing the document
  // e.g. {'name': 'Marie', 'age': 66}
  const newValue = snap.data();

// access a particular field as you would any JS property
const name = newValue.name;

// perform desired operations ...
});

/* --> Pledge Deleted
 `1. Update property pledge count and total
  2. Notify user that pledge was canceled if user selected to be notified
  3.
 */
exports.deletePledge = functions.firestore
  .document('pledges/{pledgeID}')
  .onDelete((snap) => {
  // Get an object representing the document prior to deletion
  // e.g. {'name': 'Marie', 'age': 66}
  const deletedPledge = snap.data.data();

  const propertyID = deletedPledge.propertyID;
  const property = admin.firestore().doc("properties/" + propertyID).get();


  // pledgeCount -1 
  // subtract deletedPledge amount
// perform desired operations ...
});



// On sign up.
exports.processSignUp = functions.auth.user().onCreate(event => {
  const user = event.data; // The Firebase user.
  const email = user.email;

  const msg = {
    to: email,
    from: 'jaxon77@gmail.com',
    subject: "Welcome to EcoLock",
    templateId: 'b24aece4-0168-4406-ab2d-0d5726b7335c',
    substitutionWrappers: ['{{','}}'],
    substitutions: {
      name: user.displayName
    }
  }

  sg_mail.send(msg).then(() => console.log("email sent"))
.catch( err => console.log(err));
// Check if user meets role criteria.
if (user.email &&
  user.email.indexOf('jaxon77@gmail.com') != -1 &&
  user.emailVerified) {
  const customClaims = {
    admin: true,
    accessLevel: 9
  };
  // Set custom user claims on this newly created user.
  return admin.auth().setCustomUserClaims(user.uid, customClaims)
    .then(() => {
    // Update real-time database to notify client to force refresh.
    const metadataRef = admin.database().ref("metadata/" + user.uid);
  // Set the refresh time to the current UTC timestamp.
  // This will be captured on the client to force a token refresh.
  return metadataRef.set({refreshTime: new Date().getTime()});
})
.catch(error => {
    console.log(error);
});
}
});


exports.setAdmin = functions.https.onRequest((req, res) => {
  // Get the ID token passed.
  const idToken = req.body.idToken;
// Verify the ID token and decode its payload.
admin.auth().verifyIdToken(idToken).then((claims) => {
  // Verify user is eligible for additional privileges.
  if (typeof claims.email !== 'undefined' &&
  typeof claims.email_verified !== 'undefined' &&
  claims.email_verified &&
  claims.email.indexOf('jaxon77@gmail.com') != -1) {
  // Add custom claims for additional privileges.
  admin.auth().setCustomUserClaims(claims.sub, {
    admin: true
  }).then(function() {
    // Tell client to refresh token on user.
    res.end(JSON.stringify({
      status: 'success'
    }));
  });
} else {
  // Return nothing.
  res.end(JSON.stringify({status: 'ineligible'}));
}
});
});

