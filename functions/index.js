// import functions from "firebase-functions";
// import admin from "firebase-admin";
// admin.initializeApp(functions.config().firebase);
//
// //for every show
// //list users in database who like the given genre
// //for each user who like the current genre
//
// exports.sendPushNotification = functions.database
//   .ref("users/{userID}")
//   .onCreate(event => {
//     const data = event._data;
//     console.log("Data: ", data)
//     payload = {
//       notification: {
//         title: "Welcome",
//         body: "thank for installed our app",
//       },
//     };
//     admin
//       .messaging()
//       .sendToDevice(event.token, payload)
//       .then(function(response) {
//         console.log("Notification sent successfully:", response);
//       })
//       .catch(function(error) {
//         console.log("Notification sent failed:", error);
//       });
//   });
