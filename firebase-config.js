// JavaScript Document
const firebaseConfig = {
    apiKey: "你的apiKey",
    authDomain: "你的项目.firebaseapp.com",
    projectId: "你的项目ID",
    storageBucket: "你的项目.appspot.com",
    messagingSenderId: "你的发送者ID",
    appId: "你的应用ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
