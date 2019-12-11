/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);

//
// admin.initializeApp(functions.config().firebase);
// exports.sendPushNotification = functions.database
//   .ref("users/{userID}")
//   .onCreate(event => {
//     const data = event._data;
//     payload = {
//       notification: {
//         title: "Welcome",
//         body: "thank for installed our app",
//       },
//     };
//     admin
//       .messaging()
//       .sendToDevice(data.notification_token, payload)
//       .then(function(response) {
//         console.log("Notification sent successfully:", response);
//       })
//       .catch(function(error) {
//         console.log("Notification sent failed:", error);
//       });
//   });
