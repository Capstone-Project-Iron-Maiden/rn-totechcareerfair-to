
import * as firebase from 'firebase';
import * as FileSystem from 'expo-file-system';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

export function firebaseLogin() {
  // Initialize Firebase
  try {
    //connection data from Firebase
    var firebaseConfig = {
      apiKey: "AIzaSyBclNKeDHm3mk8BbnBi6-kE5uyoQTPdJtk",
      authDomain: "entrepreneurs-52a6a.firebaseapp.com",
      databaseURL: "https://entrepreneurs-52a6a.firebaseio.com",
      projectId: "entrepreneurs-52a6a",
      storageBucket: "entrepreneurs-52a6a.appspot.com",
      messagingSenderId: "498850433095",
      appId: "1:498850433095:web:3e63161ee03b47673b0962",
      measurementId: "G-XHDC0RR8NS"  
    };
    
    firebase.initializeApp(firebaseConfig);
    console.log('Firebase connected');

    loadHomeData();

    loadScheduleData();

    loadExhibitorData();

    loadSpeakerData();

    loadTicketData();

    registerForPushNotifications();

  }
  catch (error) {
    console.log('Firebase error');
  }
}

export function loadHomeData() {
    firebase.database().ref('/totechcareerfairDBTO/homescreen').on('value', (snapshot) => {
      var tempJSON = snapshot.val();
      console.log('Home Data Loaded from Firebase.');
      var path = FileSystem.documentDirectory + 'homedata.json';
      FileSystem.writeAsStringAsync(path, JSON.stringify(tempJSON));
    });
}

export function loadScheduleData() {
  firebase.database().ref('/totechcareerfairDBTO/schedulescreen').on('value', (snapshot) => {
    var tempJSON = snapshot.val();
    console.log('Schedule Data Loaded from Firebase.');
    var path = FileSystem.documentDirectory + 'scheduledata.json';
    FileSystem.writeAsStringAsync(path, JSON.stringify(tempJSON));
  });
}

export function loadExhibitorData() {
  firebase.database().ref('/totechcareerfairDBTO/exhibitorscreen').on('value', (snapshot) => {
    var tempJSON = snapshot.val();
    console.log('Exhibitor Data Loaded from Firebase.');
    var path = FileSystem.documentDirectory + 'exhibitordata.json';
    FileSystem.writeAsStringAsync(path, JSON.stringify(tempJSON));
  });
}

export function loadSpeakerData() {
  firebase.database().ref('/totechcareerfairDBTO/speakerscreen').on('value', (snapshot) => {
    var tempJSON = snapshot.val();
    console.log('Speaker Data Loaded from Firebase.');
    var path = FileSystem.documentDirectory + 'speakerdata.json';
    FileSystem.writeAsStringAsync(path, JSON.stringify(tempJSON));
  });
}

export function loadTicketData() {
  firebase.database().ref('/totechcareerfairDBTO/ticketscreen').on('value', (snapshot) => {
    var tempJSON = snapshot.val();
    console.log('Ticket Data Loaded from Firebase.');
    var path = FileSystem.documentDirectory + 'ticketdata.json';
    FileSystem.writeAsStringAsync(path, JSON.stringify(tempJSON));
  });
}

export async function registerForPushNotifications() {
  //check if permission exist
  const {status} =  Permissions.getAsync(Permissions.NOTIFICATIONS);
  let finalStatus;

  // if not, ask for permission
  if (status !== 'granted'){
    const status = Permissions.askAsync(Permissions.NOTIFICATIONS);
    console.log('Permission granted.')
    finalStatus = status;
  }

  if (finalStatus !== 'granted'){
    console.log('Permission denied.');
    return;
  }
  let token =  Notifications.getExpoPushTokenAsync();
  console.log('Push token:' + token);

  //let uid = firebase.auth().currentUser.uid;
  //firebase.database().ref("/entrepeneurDBTO").child("users").set({
  //  expoPushToken: token
  //});

}