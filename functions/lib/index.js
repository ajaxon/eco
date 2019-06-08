"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const stripe = require('stripe')(functions.config().stripe.key);
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
admin.initializeApp(functions.config().firebase);
const SEND_GRID_APIKEY = functions.config().sendgrid.key;
const sg_mail = require('@sendgrid/mail');
sg_mail.setApiKey(SEND_GRID_APIKEY);
// On Pledge Create
// Update pledge count / amount on property
// Send email to user to confirm
exports.createPledge = functions.firestore
    .document('pledges/{pledgeId}')
    .onCreate((snap, context) => {
    // Get an object representing the document
    // e.g. {'name': 'Marie', 'age': 66}
    const pledge = snap.data();
    const restRef = admin.firestore().collection('properties').doc(pledge.property_id);
    // access a particular field as you would any JS property
    // Update aggregations in a transaction
    return admin.firestore().runTransaction(transaction => {
        return transaction.get(restRef).then(restDoc => {
            // Compute new number of ratings
            let pledgeCount = restDoc.get('pledges.count') || 0;
            pledgeCount++;
            // Compute new average rating
            let pledgeTotal = restDoc.get('pledges.total') || 0;
            pledgeTotal += pledge.amountCents;
            // Update restaurant info
            return transaction.update(restRef, {
                "pledges": {
                    count: pledgeCount,
                    total: pledgeTotal
                }
            });
        });
    });
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
    const deletedPledge = snap.data();
    const propertyID = deletedPledge.property_id;
    const property = admin.firestore().doc("properties/" + propertyID);
    // Update aggregations in a transaction
    return admin.firestore().runTransaction(transaction => {
        return transaction.get(property).then(restDoc => {
            // Compute new number of ratings
            const pledgeCount = restDoc.get('pledges.count') - 1;
            // Compute new  total pledge amount
            const pledgeTotal = restDoc.get('pledges.total') - deletedPledge.amountCents;
            // Update property pledge details info
            return transaction.update(property, {
                "pledges": {
                    count: pledgeCount,
                    total: pledgeTotal
                }
            });
        });
    });
    // pledgeCount -1 
    // subtract deletedPledge amount
    // perform desired operations ...
});
// On sign up.
exports.processSignUp = functions.auth.user().onCreate(event => {
    const user = event; // The Firebase user.
    const email = user.email;
    const msg = {
        to: email,
        from: 'jaxon77@gmail.com',
        subject: "Welcome to EcoLock",
        templateId: 'b24aece4-0168-4406-ab2d-0d5726b7335c',
        substitutionWrappers: ['{{', '}}'],
        substitutions: {
            name: user.displayName
        }
    };
    sg_mail.send(msg).then(() => console.log("email sent"))
        .catch(err => console.log(err));
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
            claims.email.indexOf('jaxon77@gmail.com') !== -1) {
            // Add custom claims for additional privileges.
            admin.auth().setCustomUserClaims(claims.sub, {
                admin: true
            }).then(function (data) {
                // Tell client to refresh token on user.
                res.end(JSON.stringify({
                    status: 'success'
                }));
            }).catch(function (error) {
                console.log;
            });
        }
        else {
            // Return nothing.
            res.end(JSON.stringify({ status: 'ineligible' }));
        }
    }).catch(function (error) {
        console.log(error);
    });
});
// When user is created -> register them with Stripe
exports.createStripeCustomer = functions.auth.user()
    .onCreate((user) => __awaiter(this, void 0, void 0, function* () {
    const customer = yield stripe.customers.create({ email: user.email });
    return admin.firestore()
        .collection('stripe_customers')
        .doc(user.uid)
        .set({ customer_id: customer.id });
}));
//# sourceMappingURL=index.js.map